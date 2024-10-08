# <img src='https://cdn.icon-icons.com/icons2/2108/PNG/512/laravel_icon_130892.png'  width='28px'> Laravel CRUD API with 🔐 User Authentification, 🧪 Unit Tests, 🗄️ DB seeding and <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_swagger_icon_130134.png" width="26px"/> Swagger Documentation 🐘

### Description 📜

Laravel Tasks CRUD API with atuhentification, search functionality, DB seeding, Unit tests and Swagger documentation. <br>
Users need to register and authenticate using Laravel Sanctum to gain access to the application’s features. Once authenticated, users can perform CRUD (Create, Read, Update, Delete) operations on tasks, search for tasks by title, and logout securely. The application ensures secure access to these functionalities through token-based authentication, providing a robust and secure environment for managing tasks and user sessions.

<hr/>

### 💻 Stack: <br/>

<img src='https://www.php.net//images/logos/new-php-logo.svg' width='32' style='margin-right: 2px;'/>[PHP](https://www.php.net/)<br/>
<img src='https://cdn.icon-icons.com/icons2/2108/PNG/512/laravel_icon_130892.png' style='margin-right: 5px;' width='20px'>[Laravel](https://laravel.com/)<br/>
<img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_swagger_icon_130134.png" width="22px"/> [Swagger](https://swagger.io/)<br>

## Table of Contents

-   Installation
-   Configuration
-   Database Seeding
-   Routes
-   Running the Project
-   Unit Tests
-   Swagger Documentation
-   User Permissions
-   Authorization Errors

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```bash
    composer install
    ```

## Configuration

1. Generate an application key:

    ```bash
    php artisan key:generate
    ```

2. Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

3. Configure the database connection in the `.env` file:
    ```env
    DB_CONNECTION=your_database_driver
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    ```

## Database Seeding

1. Run the database migrations and seed the database:

    ```bash
    php artisan migrate
    php artisan db:seed --class=UsersSeeder
    php artisan db:seed --class=TasksSeeder
    ```

    This will create two **users**: one random user
    and one test user with _values_: **name**: '**_Test User_**', **email**: **_testuser@example.com_**. Both users will have '**_Test123._**' as '**password**' value.
    Also this will generate 5 random tasks that will be assigned randomly between these two users.

## Routes

The following routes are defined in the project:

-   **Authentication Routes:**

    -   `POST /login` - Login a user
    -   `POST /registration` - Register a new user
    -   `POST /logout` - Logout a user (protected route)

-   **Task Routes (protected routes):**

    -   `GET /tasks` - Get all tasks
    -   `POST /tasks` - Create a new task
    -   `GET /tasks/{id}` - Get a task by ID
    -   `PUT /tasks/{id}` - Update a task by ID
    -   `DELETE /tasks/{id}` - Delete a task by ID
    -   `GET /tasks/search/{name}` - Search tasks by title

-   **User Route (protected route):**
    -   `GET /user` - Get the authenticated user's information

## Running the Project

1. Serve the application:

    ```bash
    php artisan serve
    ```

2. The application will be available at `http://127.0.0.1:8000`.

## Unit Tests

Unit tests are provided for authentication and task management.

1. Run the tests:
    ```bash
    php artisan test
    ```

## Swagger Documentation

Swagger is integrated into the project for API documentation.

1. Generate Swagger documentation:

    ```bash
    php artisan l5-swagger:generate
    ```

2. Access the Swagger UI at `/api/documentation`.

3. Update the Swagger configuration in `config/swagger.php` as needed.

## User Permissions

Each user can only access, edit, view, and delete their own tasks. This ensures that user data is kept private and secure.

## Authorization Errors

If you encounter an authorization error, please ensure that you are logged in with the correct credentials. Common authorization errors include:

-   **_Unauthorized access_**: You do not have permission to access this resource.
-   **_Invalid token_**: Your session has expired. Please log in again.

---

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).
-   [Powerful dependency injection container](https://laravel.com/docs/container).
-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).
-   [Robust background job processing](https://laravel.com/docs/queues).
-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

-   **[Vehikl](https://vehikl.com/)**
-   **[Tighten Co.](https://tighten.co)**
-   **[WebReinvent](https://webreinvent.com/)**
-   **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
-   **[64 Robots](https://64robots.com)**
-   **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
-   **[Cyber-Duck](https://cyber-duck.co.uk)**
-   **[DevSquad](https://devsquad.com/hire-laravel-developers)**
-   **[Jump24](https://jump24.co.uk)**
-   **[Redberry](https://redberry.international/laravel/)**
-   **[Active Logic](https://activelogic.com)**
-   **[byte5](https://byte5.de)**
-   **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
