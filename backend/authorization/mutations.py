import graphene
import graphql_jwt
from . import models, types
from graphene_file_upload.scalars import Upload
from django.core.mail import send_mail
import secrets
from django.contrib.auth import get_user_model

from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore


# Настройте поведение ObtainJSONWebToken, чтобы включить информацию о пользователе.
class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(types.UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


# Мутация сохраняеет данные в сессию и отправляет токен
class CreateUser(graphene.Mutation):
    success_cruser = graphene.Boolean()

    class Arguments:
        first_name = graphene.String(required=True, name='first_name')
        last_name = graphene.String(required=True, name='last_name')
        profile_region = graphene.String(required=True, name='profile_region')
        profile_city = graphene.String(required=True, name='profile_city')
        password = graphene.String(required=True)
        username = graphene.String(required=True)
        joined_date = graphene.String(required=True, name='joined_date')

        percent_prepayment = graphene.String(required=False, name='percent_prepayment')
        prepayment_fixed = graphene.String(required=False, name='prepayment_fixed')
        non_refundable_prepayment = graphene.String(required=False, name='non_refundable_prepayment')
        color_theme = graphene.Boolean(required=True, name='color_theme')
        notifications_coming = graphene.Boolean(required=True, name='notifications_coming')
        notifications_past = graphene.Boolean(required=True, name='notifications_past')
        cope_backup = graphene.Boolean(required=True, name='cope_backup')
        synchronization = graphene.Boolean(required=True)

    def mutate(self, info, first_name, last_name, profile_region, profile_city, password, username, joined_date,
               percent_prepayment, prepayment_fixed, non_refundable_prepayment, color_theme, notifications_coming,
               notifications_past, cope_backup, synchronization):

        # Проверяем существование пользователя по username
        user_exists = get_user_model().objects.filter(username=username).exists()

        if user_exists:
            # Если пользователь существует, завершаем мутацию
            return CreateUser(success_cruser=False)

        # print('Создание токена')
        # confirmation_token = secrets.token_urlsafe(16)

        print('Создание словаря')
        user_data = {
            'first_name': first_name,
            'last_name': last_name,
            'profile_region': profile_region,
            'profile_city': profile_city,
            'username': username,
            'joined_date': joined_date,
            'password': password,
            'percent_prepayment': percent_prepayment,
            'prepayment_fixed': prepayment_fixed,
            'non_refundable_prepayment': non_refundable_prepayment,
            'color_theme': color_theme,
            'notifications_coming': notifications_coming,
            'notifications_past': notifications_past,
            'cope_backup': cope_backup,
            'synchronization': synchronization,
            # 'confirmation_token': confirmation_token,
        }

        # print('Сохранение в сессию')
        # info.context.session['temp_user'] = user_data

        print('Определение хранилища')
        session = SessionStore()
        print('Сохранение в хранилище хранилища')
        session['temp_user'] = user_data
        print('Создание хранилища')
        session.create()
        session_key = session.session_key

        print('Отправка письма')
        # Отправляем письмо для подтверждения
        subject = 'Подтверждение регистрации'
        message = f'Ссылка для подтверждения: http://localhost:5173/confirm/{session_key}'      # ТУТ ДОБАВИТЬ ССЫЛКУ
        from_email = 'eventmanagapp@gmail.ru'
        recipient_list = [user_data['username']]

        send_mail(subject, message, from_email, recipient_list)

        # print('Добавляем сессию в базу данных')
        # info.context.session.create()

        # print("session:", info.context.session)
        # print("keys:", info.context.session.keys())
        # print("session_key:", info.context.session.session_key)

        return CreateUser(success_cruser=True)


# Мутация отправляет данные в базу данных
class ConfirmRegistrationMutation(graphene.Mutation):
    user = graphene.Field(types.UserType)

    class Arguments:
        token = graphene.String(required=True)

    def mutate(self, info, token):   # request

        try:
            session = SessionStore(session_key=token)
            print("session:", session)
            print('Выгрузка')
            temp_user_data = session.get('temp_user')

            if not temp_user_data:
                raise ValueError('В сеансе не найдены пользовательские данные.')

            # Выносим и удаляем password из temp_user_data
            password = temp_user_data.pop('password', None)
            if not password:
                raise ValueError('Пароль не найден в temp_user_data.')

            # Создаем экземпляр модели User с использованием значений из temp_user_data
            user = models.User(**temp_user_data)
            user.set_password(password)
            user.save()

            # Очищаем временные данные из сессии
            session.delete()
            print("session:", session['temp_user'])

            return ConfirmRegistrationMutation(user=user)
        except Exception as e:
            print(f'Ошибка подтверждения регистрации: {str(e)}')
            return ConfirmRegistrationMutation(user=None)


# Мутация сохраняеет данные в сессию и отправляет код
class BeginRestorePasswordMutation(graphene.Mutation):
    success_check_user = graphene.Boolean()

    class Arguments:
        username = graphene.String(required=True)

    def mutate(self, info, username):
        # Проверяем существование пользователя по username
        user_exists = get_user_model().objects.filter(username=username).exists()

        if not user_exists:
            # Если пользователя не существует, завершаем мутацию
            return BeginRestorePasswordMutation(success_check_user=False)

        user_data = {
            'username': username,
        }
        info.context.session['temp_user'] = user_data

        # Отправляем код для проверки
        confirmation_code = secrets.randbelow(9999)
        user_data['confirmation_code'] = confirmation_code

        subject = 'Восстановление пароля'
        message = f'Код для подтверждения: {confirmation_code}'
        from_email = 'eventmanagapp@gmail.ru'
        recipient_list = [user_data['username']]

        send_mail(subject, message, from_email, recipient_list)

        return BeginRestorePasswordMutation(success_check_user=True)


# Мутация проверяет код
class ConfirmRestorePasswordMutation(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        code = graphene.String(required=True)

    def mutate(self, info, code):
        try:
            temp_user_data = info.context.session.get('temp_user')
            if not temp_user_data:
                raise ValueError('В сеансе не найдены пользовательские данные.')
            if temp_user_data.get('confirmation_code') != code:
                raise ValueError('Неверный код подтверждения.')

            return ConfirmRestorePasswordMutation(success=True)
        except Exception as e:
            print(f'Ошибка подтверждения регистрации: {str(e)}')
            return ConfirmRestorePasswordMutation(user=False)


class RestorePasswordMutation(graphene.Mutation):
    user = graphene.Field(types.UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password):
        try:
            # Находим пользователя по username
            user = get_user_model().objects.get(username=username)
            user.set_password(password)
            user.save()

            # Очищаем временные данные из сессии
            del info.context.session['temp_user']

            return RestorePasswordMutation(user=user)
        except Exception as e:
            print(f'Ошибка смены пароля: {str(e)}')
            return RestorePasswordMutation(user=None)


class ChangePasswordMutation(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        username = graphene.String(required=True)
        current_password = graphene.String(required=True, name='current_password')
        new_password = graphene.String(required=True, name='new_password')

    def mutate(self, info, username, current_password, new_password):
        # Находим пользователя по username
        user = get_user_model().objects.get(username=username)

        # Проверяем текущий пароль
        if not user.check_password(current_password):
            return ChangePasswordMutation(success=False)

        # Обновляем пароль
        user.set_password(new_password)
        user.save()

        return ChangePasswordMutation(success=True)


class UpdateUserProfile(graphene.Mutation):
    user = graphene.Field(types.UserType)

    class Arguments:
        id = graphene.ID(required=True)
        first_name = graphene.String(required=False, name='first_name')
        last_name = graphene.String(required=False, name='last_name')
        profile_region = graphene.String(required=False, name='profile_region')
        profile_city = graphene.String(required=False, name='profile_city')
        # username = graphene.String(required=True)                 ПРОВЕРИТЬ СООТВЕТСТВИЕ С МУТЦИЯМИ JS
        percent_prepayment = graphene.String(required=False, name='percent_prepayment')
        prepayment_fixed = graphene.String(required=False, name='prepayment_fixed')
        non_refundable_prepayment = graphene.String(required=False, name='non_refundable_prepayment')
        # avatar = Upload(required=False)
        # age = graphene.Int(required=False)
        # profile_type = graphene.String(required=False, name='profile_type')

    def mutate(self, info, id, first_name='', last_name='', profile_region='', profile_city='',
               percent_prepayment='', prepayment_fixed='', non_refundable_prepayment=''):
        user = models.User.objects.get(pk=id)

        user.first_name = first_name
        user.last_name = last_name
        user.profile_region = profile_region
        user.profile_city = profile_city
        # user.username = username
        user.percent_prepayment = percent_prepayment
        user.prepayment_fixed = prepayment_fixed
        user.non_refundable_prepayment = non_refundable_prepayment
        # user.avatar = avatar
        # user.age = age
        # user.profile_type = profile_type

        user.save()

        return UpdateUserProfile(user=user)


class UpdateUserSettings(graphene.Mutation):
    user = graphene.Field(types.UserType)

    class Arguments:
        id = graphene.ID(required=True)
        color_theme = graphene.String(required=False, name='color_theme')
        notifications_coming = graphene.String(required=False, name='notifications_coming')
        notifications_past = graphene.String(required=False, name='notifications_past')
        cope_backup = graphene.String(required=False, name='cope_backup')
        synchronization = graphene.String(required=False)

    def mutate(self, info, id, color_theme='', notifications_coming='', notifications_past='', cope_backup='',
               synchronization=''):
        user = models.User.objects.get(pk=id)

        user.color_theme = color_theme
        user.notifications_coming = notifications_coming
        user.notifications_past = notifications_past
        user.cope_backup = cope_backup
        user.synchronization = synchronization

        user.save()

        return UpdateUserProfile(user=user)


class CreateEvent(graphene.Mutation):
    eventid = graphene.Field(types.EventType)

    class Arguments:
        id = graphene.ID(required=True)
        short_name = graphene.String(required=True)
        date_event = graphene.String(required=True)
        created_at = graphene.String(required=True)
        start_time = graphene.String(required=True)
        end_time = graphene.String(required=True)
        duration_time = graphene.Decimal(required=False)
        client = graphene.String(required=True)
        region_event = graphene.String(required=True)
        city_event = graphene.String(required=True)
        address = graphene.String(required=False)
        fio_client = graphene.String(required=True)
        num_phone = graphene.String(required=True)
        contact_tg = graphene.String(required=False)
        contact_vk = graphene.String(required=False)
        num_phone_add = graphene.String(required=False)
        notes = graphene.String(required=False)
        schedules = graphene.JSONString(required=False)
        payment = graphene.Int(required=False)
        prepayment = graphene.Int(required=False)
        at_the_event = graphene.Int(required=False)
        remainder = graphene.Int(required=False)
        non_refundable_prepayment = graphene.Int(required=False)
        expenses = graphene.JSONString(required=False)
        expenses_sum = graphene.Int(required=False)
        source_event = graphene.String(required=False)
        status_event = graphene.String(required=True)
        format_event = graphene.String(required=True)
        type_event = graphene.String(required=True)
        is_payment_checked = graphene.Boolean(required=False)
        is_prepayment_checked = graphene.Boolean(required=False)
        is_at_the_event_checked = graphene.Boolean(required=False)
        is_remainder_checked = graphene.Boolean(required=False)
        add_non_refundable_prepayment = graphene.Boolean(required=False)

    def mutate(self, info, id, short_name, date_event, start_time, end_time, duration_time, client, region_event, city_event,
               address, fio_client, num_phone, contact_tg, contact_vk, num_phone_add, notes, schedules, payment,
               prepayment, at_the_event, remainder, expenses, expenses_sum, source_event, status_event, format_event,
               type_event, is_payment_checked, is_prepayment_checked, is_at_the_event_checked, is_remainder_checked,
               add_non_refundable_prepayment):
        user = get_user_model().objects.get(pk=id)

        eventid = models.Event(
            user=user,
            short_name=short_name,
            date_event=date_event,
            start_time=start_time,
            end_time=end_time,
            duration_time=duration_time,
            client=client,
            region_event=region_event,
            city_event=city_event,
            address=address,
            fio_client=fio_client,
            num_phone=num_phone,
            contact_tg=contact_tg,
            contact_vk=contact_vk,
            num_phone_add=num_phone_add,
            notes=notes,
            schedules=schedules,
            payment=payment,
            prepayment=prepayment,
            at_the_event=at_the_event,
            remainder=remainder,
            expenses=expenses,
            expenses_sum=expenses_sum,
            source_event=source_event,
            status_event=status_event,
            format_event=format_event,
            type_event=type_event,
            is_payment_checked=is_payment_checked,
            is_prepayment_checked=is_prepayment_checked,
            is_at_the_event_checked=is_at_the_event_checked,
            is_remainder_checked=is_remainder_checked,
            add_non_refundable_prepayment=add_non_refundable_prepayment
        )
        eventid.save()

        return CreateEvent(eventid=eventid)


class UpdateEvent(graphene.Mutation):
    eventid = graphene.Field(types.EventType)

    class Arguments:
        id = graphene.ID(required=True)
        id_event = graphene.ID(required=True)
        short_name = graphene.String(required=True)
        date_event = graphene.String(required=True)
        start_time = graphene.String(required=True)
        end_time = graphene.String(required=True)
        duration_time = graphene.Decimal(required=False)
        client = graphene.String(required=True)
        region_event = graphene.String(required=True)
        city_event = graphene.String(required=True)
        address = graphene.String(required=False)
        fio_client = graphene.String(required=True)
        num_phone = graphene.String(required=True)
        contact_tg = graphene.String(required=False)
        contact_vk = graphene.String(required=False)
        num_phone_add = graphene.String(required=False)
        notes = graphene.String(required=False)
        schedules = graphene.JSONString(required=False)
        payment = graphene.Int(required=False)
        prepayment = graphene.Int(required=False)
        at_the_event = graphene.Int(required=False)
        remainder = graphene.Int(required=False)
        non_refundable_prepayment = graphene.Int(required=False)
        expenses = graphene.JSONString(required=False)
        expenses_sum = graphene.Int(required=False)
        source_event = graphene.String(required=False)
        status_event = graphene.String(required=True)
        format_event = graphene.String(required=True)
        type_event = graphene.String(required=True)
        is_payment_checked = graphene.Boolean(required=False)
        is_prepayment_checked = graphene.Boolean(required=False)
        is_at_the_event_checked = graphene.Boolean(required=False)
        is_remainder_checked = graphene.Boolean(required=False)
        add_non_refundable_prepayment = graphene.Boolean(required=False)

    def mutate(self, info, id, id_event, short_name='', date_event='', start_time='', end_time='', duration_time='',
               client='', region_event='', city_event='', address='', fio_client='', num_phone='', contact_tg='',
               contact_vk='', num_phone_add='', notes='', schedules='', payment='', prepayment='', at_the_event='',
               remainder='', expenses='', expenses_sum='', source_event='', status_event='', format_event='',
               type_event='', is_payment_checked='', is_prepayment_checked='', is_at_the_event_checked='',
               is_remainder_checked='', add_non_refundable_prepayment=''):
        user = get_user_model().objects.get(pk=id)
        eventid = user.event_log.get(pk=id_event)

        eventid.short_name = short_name
        eventid.date_event = date_event
        eventid.start_time = start_time
        eventid.end_time = end_time
        eventid.duration_time = duration_time
        eventid.client = client
        eventid.region_event = region_event
        eventid.city_event = city_event
        eventid.address = address
        eventid.fio_client = fio_client
        eventid.num_phone = num_phone
        eventid.contact_tg = contact_tg
        eventid.contact_vk = contact_vk
        eventid.num_phone_add = num_phone_add
        eventid.notes = notes
        eventid.schedules = schedules
        eventid.payment = payment
        eventid.prepayment = prepayment
        eventid.at_the_event = at_the_event
        eventid.remainder = remainder
        eventid.expenses = expenses
        eventid.expenses_sum = expenses_sum
        eventid.source_event = source_event
        eventid.status_event = status_event
        eventid.format_event = format_event
        eventid.type_event = type_event
        eventid.is_payment_checked = is_payment_checked
        eventid.is_prepayment_checked = is_prepayment_checked
        eventid.is_at_the_event_checked = is_at_the_event_checked
        eventid.is_remainder_checked = is_remainder_checked
        eventid.add_non_refundable_prepayment = add_non_refundable_prepayment

        eventid.save()

        return UpdateEvent(eventid=eventid)


class Mutation(graphene.ObjectType):
    # Tokens
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    create_user = CreateUser.Field()
    confirm_registration = ConfirmRegistrationMutation.Field()
    create_event = CreateEvent.Field()

    begin_restore_password = BeginRestorePasswordMutation.Field()
    confirm_restore_password = ConfirmRestorePasswordMutation.Field()
    restore_password = RestorePasswordMutation.Field()

    update_user_settings = UpdateUserSettings.Field()
    update_user_profile = UpdateUserProfile.Field()
    update_event = UpdateEvent.Field()
