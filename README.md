# .event - SPA (Single Page Application)

## Оглавление

1.	[О продукте](#about-project)
2.	[Основные функции сервиса](#function)
3.	[Демонстрация пользовательского интерфейса](#demonstration)
4.	[Стэк проекта](#stack-project)
5.	[Процесс разработки](#development-process)

## <a name="about-project">О продукте</a>

<img src="https://github.com/glooshkov/dot_event/blob/master/frontend/public/demo/logo.svg" align="center"
     alt="logo by day of the event" width="20%">

Продукт представляет собой сервис аналитики мероприятий для ведущих (мероприятий). 
&nbsp;


Для ведения бизнеса больше нет необходимости в бесконечных записях в "Заметках" или блокноте, расчетов в таблицах Excel, постоянно растущей телефонной книге. Достаточно один раз создать событие, внести все необходимые данные, и вся информация о мероприятии будет на всех ваших устройствах. Все суммы, числа и прочие данные будут автоматически включены в расчет аналитики. Также, вы сразу сможете посмотреть сколько вы заработали за этот месяц, сколько у вас было мероприятий и какого они формата, какая средняя стоимость одного часа ведения свадьбы или корпоратива, а также другие аналитические данные.

## <a name="function">Основные функции сервиса</a>

#### Создание событий
>Cоздание мероприятия на выбранную дату, заполнение информации о планируемом мероприятии (время, место, формат и статус события, расписание, заметки, оплата и др.)
#### Редактирование и управление событиями
>Изменение информации о выбранном мероприятии, изменение типа (заявка, либо событие) или удаление
#### Журнала событий
>Просматривать список с общей информацией о запланированных событиях за выбранный год
#### Аналитические показатели по итогам выпоненной работы
>Просмотр аналитических графиков и параметров, относящихся к проведенным мероприятиям, для оценки достигнутых результатов и выявления областей для улучшения
#### Календарь событий
>Встроенный календарь, в котором можно искать события или узнать какие дни пока свободны 
#### Поиск событий
>Поиск событий по различным параметрам
<br />


> [!IMPORTANT]  
> (Примечание для разработчиков) Это коммерческий проект, над которым в данный момент продолжается работа. Данный репозиторий создан для демонстрации структуры исходного кода приложения. В приведённом репозитории скрыта часть файлов, также присутствуют пустые компоненты .vue (помечены как “Empty”).

> [!TIP]  
> (Примечание для разработчиков) Список доступных для просмотра компонентов .vue:
>
> - [CreateEvent.vue](https://github.com/glooshkov/dot_event/blob/master/frontend/src/views/main/CreateEvent.vue) – компонент создания события/заявки
> - [AboutEvent.vue](https://github.com/glooshkov/dot_event/blob/master/frontend/src/views/main/AboutEvent.vue) – компонент просмотра, управления и редактирования события/заявки
> - [LogEvent.vue](https://github.com/glooshkov/dot_event/blob/master/frontend/src/views/main/LogEvent.vue) – журнал событий и заявок
> - [methodGlobal.js](https://github.com/glooshkov/dot_event/blob/master/frontend/src/stores/methodGlobal.js) – глобальные методы компонентов 

## <a name="demonstration">Демонстрация пользовательского интерфейса</a>

<details open>
<summary>
 Компоненты
</summary> <br />

<p align="center">
    <img width="49%" src="/frontend/public/demo/short/search.png" alt="search"/>
&nbsp;
    <img width="49%" src="/frontend/public/demo/short/log.png" alt="log"/>
</p>

<p align="center">
    <img width="49%" src="/frontend/public/demo/short/personal.png" alt="personal data"/>
&nbsp;
    <img width="49%" src="/frontend/public/demo/short/settings.png" alt="settings"/>
</p> 

<details>
<summary>
 Полный макет компонента
</summary>
<p align="center">
    <img width="49%" src="/frontend/public/demo/full/personal.png" alt="personal data full"/>
&nbsp;
    <img width="49%" src="/frontend/public/demo/full/settings.png" alt="settings full"/>
</p>
</details>

<p align="center">
    <img width="49%" src="/frontend/public/demo/short/new.png" alt="new"/>
&nbsp;
    <img width="49%" src="/frontend/public/demo/short/about.png" alt="about"/>
</p> 

<details>
<summary>
 Полный макет компонента
</summary>
<p align="center">
    <img width="49%" src="/frontend/public/demo/full/create.png" alt="create"/>
&nbsp;
    <img width="49%" src="/frontend/public/demo/full/about.png" alt="about full"/>
</p> 
</details>

<p align="center">
    <img width="49%" src="/frontend/public/demo/short/profanalitic.png" alt="profile analytics"/>
&nbsp;
    <img width="49%" src="/frontend/public/demo/short/finanalitic.png" alt="financial analytics"/>
</p>

<details>
<summary>
 Полный макет компонента
</summary>
<p align="center">
    <img width="49%" src="/frontend/public/demo/full/profileanalitic.png" alt="profile analytics full"/>
&nbsp;
    <img width="49%" src="/frontend/public/demo/full/finanalitic.png" alt="financial analytics full"/>
</p> 
</details>

<p align="center">
    <img width="49%" src="/frontend/public/demo/short/calendar.png" alt="calendar"/>
</p>

</details>

## <a name="stack-project">Стэк проекта</a>

### Backend:

- Язык программирования: Python
- Фреймворк: Django
- Язык запросов: GraphQL
- Инструменты для работы с GraphQL: graphene-django
- Пакет для обеспечения кросс-доменных запросов: django-cors-headers
- Пакет для интеграции JWT с Django: django-graphql-jwt
- Разработка регистрации с подтверждением через email: django-session и django.core
- СУБД: PostgreSQL

### Frontend:

- Языки: JavaScript, HTML, CSS
- Фреймворк: Vue.js
- Инструмент сборки: Vite
- Библиотека для работы с GraphQL в приложении Vue: Apollo
- Механизм авторизации: JWT (JSON Web Token)
- Централизованное хранилище информации авторизации для всех компонентов: Pinia
- Библиотека для построения графиков и диаграмм: Echarts

## <a name="development-process">Процесс разработки SPA</a>

### Определение целей и задач для разработки:

- Проведение встречи с заказчиком для выявления основных требований к функциональности приложения, включая аспекты аналитики, визуализации данных и управления контентом.
- Поиск и анализ необходимых метрик эффективности. Проработка этих метрик с экспертной группой заказчика.
- Определение входных данных и параметров, необходимых для дальнейшей работы.

### Проектирование структуры данных:

- Разработка схемы данных для эффективного сбора, хранения и анализа информации, с учетом обеспечения согласованности и нормализации данных для повышения их качества и доступности для аналитики.
- Выбор наиболее подходящей модели данных и базы данных, соответствующих требованиям проекта.

### Разработка интерфейса пользователя:

- Создание дизайна пользовательского интерфейса с учетом требований и ожиданий заказчика.
- Разработка компонентов на Vue.js и Vite, включая верстку (HTML, CSS) и реализацию функционала клиентской части приложения на JavaScript.
- Проведение совместной проработки компонентов с заказчиком и тестирование пользовательского опыта (UX).
- Реализация файлов мутаций и запросов ([`mutations.js`](https://github.com/glooshkov/dot_event/blob/master/frontend/src/mutations.js) и [`queries.js`](https://github.com/glooshkov/dot_event/blob/master/frontend/src/queries.js)) к базе данных, а также настройка взаимодействия с серверной частью при помощи библиотеки Apollo и GraphQL.
- Внедрение Pinia для централизованного хранения информации об авторизации (JWT-токены), обеспечивающего доступ к данным для всех компонентов.

### Разработка backend (Python):

- Создание модели пользователей и событий в Django, включая их свойства и методы ([`models.py`](https://github.com/glooshkov/dot_event/blob/master/backend/authorization/models.py), часть данных скрыта);.
- Настройка панели администратора для управления базой данных.
- Настройка взаимодействия Django с PostgreSQL.
- Реализация клиент-серверной архитектуры с использованием GraphQL API (библиотека graphene-django).
- Разработка схемы запросов и мутаций (файлы [`schema.py`](https://github.com/glooshkov/dot_event/blob/master/backend/authorization/schema.py), [`queries.py`](https://github.com/glooshkov/dot_event/blob/master/backend/authorization/queries.py), [`mutations.py`](https://github.com/glooshkov/dot_eventdot_event/blob/master/backend/authorization/mutations.py)) для взаимодействия с клиентской частью, 
- Использование механизма CORS для обеспечения совместной работы серверной и клиентской частей приложения (django-cors-headers)
- Реализация блока регистрации с верификацией аккаунта через отправку токена на электронную почту, используя сессии Django для хранения токенов (django-sessions)
