
# Statsig Demo

- User makes request to root page "/"
- middleware.ts runs and sets a cookie with a Stable ID if needed
- root layout.tsx extracts Stable ID from cookie and sets it on the StatsigUser object 
  - Unauthed User: `{ userID: "anonymous", customIDs: { stableID: "GENERATED_STABLE_ID" } }`
- root layout.tsx uses the Statsig Server SDK to generate the evaluations values for the provided StatsigUser object
- BootstrappedStatsigProvider takes in the StatsigUser and the evaluations values and bootstraps the Statsig Client SDK
- on the client side, after the first render, the User is "authorized" and the new UserID is attached to the StatsigUser object
  - Authed User: `{ userID: "AUTH_ID", customIDs: { stableID: "GENERATED_STABLE_ID" } }`
- a `prefetchData` call is made for the new StatsigUser object, this hits the proxy/initialize route
- proxy/initialize/route.ts uses the Statsig Server SDK to generate the evaluations values for the authorized StatsigUser object


# Next JS Readme


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
