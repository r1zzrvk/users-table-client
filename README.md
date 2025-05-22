# Users Table Frontend

👉 Backend repository: [users-graphql-server](https://github.com/r1zzrvk/users-graphql-server)

This is a frontend client for interacting with a GraphQL API. Built with **React + TypeScript + MUI + Apollo (react-apollo, apollo-boost)**. The structure is designed for scalability and maintainability.

---

## ⚠️ Important Notes

- **Legacy `react-apollo` is used intentionally**, as required by the technical assignment.
- If you run into dependency issues (e.g., with `@types/react`), you may use:

  ```bash
  npm install --legacy-peer-deps
  ```

  ⚠️ Use this flag **with caution**.

---

## Project Structure

```
src/
├── components/        # Reusable UI components
├── apollo/            # Apollo client setup
├── constants/         # Static values and shared config
├── graphql/           # Queries and mutations
├── hooks/             # Custom reusable hooks
├── contexts/          # React context providers
├── utils/             # Utility functions
└── types/             # Global TypeScript types
```

---

## Getting Started

```bash
git clone https://github.com/yourname/users-table-client.git
cd users-table-client
npm install
```

---

## Required Environment Variables

Create a `.env` file in the root of the project and define the following:

```
GRAPHQL_ENDPOINT=http://localhost:4000
```

> This sets the backend GraphQL API endpoint for Apollo Client.

---

## Scripts

```bash
npm run dev       # Start development server (Vite)
npm run build     # Build for production
npm run lint      # Run ESLint
```

---

## Technologies Used

| Technology        | Purpose                        |
| ----------------- | ------------------------------ |
| React             | UI rendering                   |
| TypeScript        | Static typing                  |
| MUI               | Material UI components         |
| react-apollo      | Apollo integration (legacy)    |
| apollo-boost      | Simplified Apollo Client setup |
| graphql           | Query language for APIs        |
| eslint + prettier | Code linting and formatting    |

---
