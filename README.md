# svelte-template

This is my personal template for [Svelte/SvelteKit](https://svelte.dev) projects. It is very opinionated and might not be your taste, but feel free to fork it and make it your own :3

## Features

-   Framework: [Svelte](https://svelte.dev) & [SvelteKit](https://kit.svelte.dev)
-   Language: [TypeScript](https://www.typescriptlang.org)
-   Linter: [ESLint](https://eslint.org)
-   Formatter: [Prettier](https://prettier.io)
-   Unit testing: [Vitest](https://vitest.dev)
-   E2E testing: [Playwright](https://playwright.dev)
-   Inline CSS: [TailwindCSS](https://tailwindcss.com) & [Typography](https://tailwindcss.com/docs/typography-plugin)
-   CSS preprocessor: [PostCSS](https://postcss.org) & [Autoprefixer](https://autoprefixer.github.io)
-   CSS language: [Sass/SCSS](https://sass-lang.com)
-   Env vars: [SvelteKit's $env](https://kit.svelte.dev/docs/modules#$env-dynamic-private)
-   i18n: [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) + a custom SSR-compatible adapter

## Command to use

```bash
echo -n 'Project name: '
read project_name
git clone https://github.com/13x1/svelte-template.git $project_name
cd $project_name
git remote rename origin template
sed -i "s/svelte-template/$project_name/g" package*.json
rm README.md
echo -e "# $project_name\n\nInitialized with
[svelte-template](https://github.com/13x1/svelte-template)" > README.md
npm install
git add -A
git commit -m "Use template for $project_name"
```

Or, if you already cloned the template:

```bash
project_name=$(basename $(pwd))
git remote add template https://github.com/13x1/svelte-template
sed -i "s/svelte-template/$project_name/g" package*.json
rm README.md
echo -e "# $project_name\n\nInitialized with
[svelte-template](https://github.com/13x1/svelte-template)" > README.md
npm install
git add -A
git commit -m "Use template for $project_name"
```
