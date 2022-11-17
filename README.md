## Getting Started

Make sure that you have minimum Node.js v16 and npm v6 or above installed.

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Structure

Current project structure will look similar to this:

```
├── .github                         # GitHub folder
├── public                          # Public assets folder
├── src
│   ├── assets                      # Assets folder
│   ├── components                  # Components folder
│   │   ├── ui                      # Reusable ui components
│   │   ├── forms                   # Form components which include input, textarea, dropdown ....
│   │   ├── other..                 # Other components
│   ├── constants                   
│   ├── helpers                     
│   ├── interfaces                  # App's model types interfaces
│   ├── pages                      
│   ├── queries                     # List of queries for react-query
│   └── types                       # Custom type definition
│   └── utils                       
│   └── zustand                     # State management
│   └── middleware.ts               # Nex-auth middleware to protect routes
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## Tech Stack

Here's a curated list of packages that you should be at least familiar with before starting project. However, the best way to see a complete list of the dependencies is to check [package.json](https://github.com/growfi-ai/cahramel-fe/blob/main/package.json).

### Core

- [ ] [NextJS](https://nextjs.org/docs/getting-started)
- [ ] [Tailwindcss](https://tailwindcss.com/docs/utility-first)
- [ ] [React Hook Form](https://react-hook-form.com/get-started)
- [ ] [React Query](https://tanstack.com/query/v4/docs/overview)
- [ ] [Zustand](https://redux-saga.github.io/redux-saga/)
- [ ] [NextAuth](https://next-auth.js.org/getting-started/example)

### Linting

- [ ] [ESLint](http://eslint.org/)
- [ ] [Prettier](https://prettier.io/)
- [ ] [TS ESLint](https://typescript-eslint.io/docs/)



## Naming Convention

### Naming Folder/ File name

For naming folder or file name, follow the `Kebab Case`.

Kebab case is similar to snake case, but you use a hyphen (-) instead of an underscore (_) to separate the words.

`Here are some examples of kebab case: client-layout and user-menu.`

### Naming function, class, variables or others

Follow [this rules](https://stackoverflow.com/a/56196707/14364980) for other namings.


## Naming under `queries` folder

For queries, the file name needs to start with `use-` and strapi cms table name.

For example naming of `User Contract`: `use-user-contract.ts`.

## Naming under `components` folder

Example of naming a components file is as follow:

 1. Check page's file name (example: `pages/configure/onboarding`)
 2. Naming for component folder will be `components/configure/onboarding/your-file-name.tsx`

## Naming under `interfaces` folder

Interfaces' file name is the same as strapi cms name.

Here is example: `User Contract`: `user-contract.ts`.