# <img src='https://cdn.icon-icons.com/icons2/2148/PNG/64/nextjs_icon_132160.png' style='margin-right: 5px;' width='32px'> Next.js 14 and <img src='https://cdn.icon-icons.com/icons2/2108/PNG/64/laravel_icon_130892.png' style='margin-right: 5px;' width='32px'> Laravel Tasks Dashboard App with authentification 🔐, <img src='https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png' style='margin-right: 5px;' width='32px'> NextUI, <img src='https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png' width='32px'> Formik, <img src='https://zod.dev/logo.svg' style='margin-right: 5px;' width='32px'> Zod, <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tailwindcss_logo_icon_167923.png" width="32px"/> Tailwind CSS and <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_plain_logo_icon_146316.png" width="28"/> TypeScript 🤗

## 📜 Description

Tasks Dashboard CRUD app, with authentification (JWT), made with Next.js 14, Laravel, NextUI, Zod, Formik, Tailwind CSS, TypeScript and JWT. On the app initialization, user have option to signin if user already created account, or to signup if user already have account.After user successfully signin, the page is redirected to tasks/dashboard page where user have option to create new task. The task form consists of task's title, description, category (personal, work, other) and task status (completed, not completed). On successfull task creation, the task is displayed in the tasks table, with created tasks's info and three options: details (tasks details page), edit (edit modal for taks updating) and delete (delete confirmation modal).

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

# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
