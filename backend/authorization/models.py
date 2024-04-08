from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator

class Site(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    logo = models.ImageField(upload_to='site/logo/')

    class Meta:
        verbose_name = 'сайт'
        verbose_name_plural = '1. Сайт'

    def __str__(self):
        return self.name


class User(AbstractUser):
    username = models.CharField(
        'Электронная почта',
        max_length=150,
        unique=True,
        help_text='Обязательне поле. 150 символов или меньше. Только буквы, цифры и @/./+/-/_.',
        validators=[UnicodeUsernameValidator()],
        error_messages={
            'unique': "Пользователь с таким именем уже существует.",
        },
        blank=False,
        null=False
    )

    first_name = models.CharField('Имя', max_length=150, blank=False, null=False)
    last_name = models.CharField('Фамилия', max_length=150, blank=False, null=False)

    joined_date = models.DateField(auto_now_add=True)

    avatar = models.ImageField(
        upload_to='users/avatars/%Y/%m/%d/',
        default='users/avatars/default.jpg'
    )
    profile_type = models.CharField(max_length=150)

    profile_region = models.CharField(blank=False, null=False)
    profile_city = models.CharField(blank=False, null=False)

    all_access = models.BooleanField(default=False)

    percent_prepayment = models.CharField(max_length=100, blank=True, null=True)
    prepayment_fixed = models.CharField(max_length=100, blank=True, null=True)
    non_refundable_prepayment = models.CharField(max_length=100, blank=True, null=True)
    color_theme = models.BooleanField(default=False)
    notifications_coming = models.BooleanField(default=False)
    notifications_past = models.BooleanField(default=False)
    cope_backup = models.BooleanField(default=False)
    synchronization = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = '2. Пользователи'

    def __str__(self):
        return self.id


class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='event_log', null=True)

    id_event = models.AutoField(primary_key=True)
    short_name = models.CharField(max_length=50)
    date_event = models.CharField()
    created_at = models.CharField()
    start_time = models.CharField()
    end_time = models.CharField()
    duration_time = models.DecimalField(max_digits=4, decimal_places=2)
    client = models.CharField(max_length=50)
    region_event = models.CharField(max_length=50)
    city_event = models.CharField(max_length=50)
    address = models.CharField(max_length=75)
    fio_client = models.CharField(max_length=50)
    num_phone = models.CharField(max_length=20)
    contact_tg = models.CharField(max_length=50)
    contact_vk = models.CharField(max_length=50)
    num_phone_add = models.CharField(max_length=20)
    notes = models.TextField(max_length=300)

    schedules = models.JSONField()

    payment = models.DecimalField(max_digits=10, decimal_places=0)
    prepayment = models.DecimalField(max_digits=10, decimal_places=0)
    at_the_event = models.DecimalField(max_digits=10, decimal_places=0)
    remainder = models.DecimalField(max_digits=10, decimal_places=0)

    non_refundable_prepayment = models.DecimalField(max_digits=10, decimal_places=0)

    expenses = models.JSONField()

    expenses_sum = models.DecimalField(max_digits=10, decimal_places=0)
    source_event = models.CharField(max_length=50)
    status_event = models.CharField(max_length=50)
    format_event = models.CharField(max_length=50)
    type_event = models.CharField(max_length=50)

    is_payment_checked = models.BooleanField(default=False)
    is_prepayment_checked = models.BooleanField(default=False)
    is_at_the_event_checked = models.BooleanField(default=False)
    is_remainder_checked = models.BooleanField(default=False)
    add_non_refundable_prepayment = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'событие'
        verbose_name_plural = '3. События'

    def __str__(self):
        return self.id_event
