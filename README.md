# <img src='https://cdn.icon-icons.com/icons2/2148/PNG/64/nextjs_icon_132160.png' style='margin-right: 5px;' width='32px'> Next.js 14 and <img src='https://cdn.icon-icons.com/icons2/2108/PNG/64/laravel_icon_130892.png' style='margin-right: 5px;' width='32px'> Laravel Tasks Dashboard App with authentification 🔐, <img src='https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png' style='margin-right: 5px;' width='32px'> NextUI, <img src='https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png' width='32px'> Formik, <img src='https://zod.dev/logo.svg' style='margin-right: 5px;' width='32px'> Zod, <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tailwindcss_logo_icon_167923.png" width="32px"/> Tailwind CSS and <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_plain_logo_icon_146316.png" width="28"/> TypeScript 🤗

## 📜 Description

Tasks Dashboard CRUD app, with authentification Laravel Sanctum, made with Next.js 14, Laravel, NextUI, Zod, Formik, Tailwind CSS, TypeScript and JWT. On the app initialization, user have option to signin if user already created account, or to signup if user already have account.After user successfully signin, the page is redirected to tasks/dashboard page where user have option to create new task. The task form consists of task's title, description, category (personal, work, other) and task status (completed, not completed). On successfull task creation, the task is displayed in the tasks table, with created tasks's info and three options: details (tasks details page), edit (edit modal for taks editing) and delete (delete confirmation modal).

## 💻 Technologies used:

<img src='https://cdn.icon-icons.com/icons2/2148/PNG/64/nextjs_icon_132160.png' style='margin-right: 5px;' width='20px'>[Next.js 14](https://nextjs.org/) - A React framework for fast, scalable web apps with features like server components and optimized routing.<br/>
<img src='https://cdn.icon-icons.com/icons2/2108/PNG/64/php_icon_130857.png' width='22' style='margin-right: 2px;'/>[PHP](https://www.php.net/) - A server-side language for building dynamic websites and APIs.<br/>
<img src='https://cdn.icon-icons.com/icons2/2108/PNG/64/laravel_icon_130892.png' style='margin-right: 5px;' width='20px'>[Laravel](https://laravel.com/) - A PHP framework with tools for routing, authentication, and database management.<br/>
<img src='https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png' style='margin-right: 5px;' width='20px'>[NextUI](https://nextui.org/) - A modern React component library for building elegant UIs.<br/>
<img src='https://zod.dev/logo.svg' style='margin-right: 5px;' width='20px'>[Zod](https://zod.dev/) - A TypeScript-first library for schema validation and type-safe data handling.<br/>
<img src='https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png' width='24px'> [Formik](https://formik.org/) - A React library for managing and validating form state easily.
<br/>
<img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tailwindcss_logo_icon_167923.png" width="22px"/> [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework for custom, responsive designs.<br>
<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_plain_logo_icon_146316.png" width="20"/> [TypeScript](https://www.typescriptlang.org/) - A typed JavaScript superset for building reliable, maintainable code<br/>

## Front-End:

## ⚙️ Configuration:

Configure the database connection in the `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=YOUR_BACKEND_URL
NEXT_PUBLIC_APP_URL=NEXT_PUBLIC_URL
```

For localhost you can set **these** values in order for app to work:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 🛠️ Installation guide:

Navigate to **./frontend** folder and run the following command:

```bash
npm install
```

### 🚀 Run the development server:

```bash
npm run dev
```

The app will run on http://localhost:3000

## Back-End:

## ⚙️ Configuration

Generate an application key:

```bash
php artisan key:generate
```

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Configure the database connection in the `.env` file:

```env
DB_CONNECTION=your_database_driver
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

### 🛠️ Installation guide:

Navigate to **./backend** folder and run the following command:

```bash
composer install
```

### 🚀 Run the development server:

```bash
php artisan serve
```

The app will run on http://localhost:8000

## Database Seeding 🌱

Run the database migrations and seed the database:

```bash
php artisan migrate
php artisan db:seed --class=UsersSeeder
php artisan db:seed --class=TasksSeeder
```

This will create two **users**: one random user
and one test user with _values_: **name**: '**_Test User_**', **email**: **_testuser@example.com_**. Both users will have '**_Test123._**' as '**password**' value.
Also this will generate 5 random tasks that will be assigned randomly between these two users.
