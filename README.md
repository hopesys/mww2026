# MWW 2026

Website for **Miss Wellness World** (MWW) — built with Next.js, React 19, and Tailwind CSS 4. Deploys to Vercel via GitHub Actions using Bun.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Bun** (package manager & runtime)

## Prerequisites

- [Bun](https://bun.sh) 1.x (recommended) or Node.js 20+

## Getting started

### Install dependencies

```bash
bun install
```

### Run development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
bun run build
```

### Start production server (local)

```bash
bun run start
```

### Lint

```bash
bun run lint
```

## Project structure

```
├── app/                 # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/          # React components
│   ├── about/           # About MWW, MWWT, Executive Team
│   ├── halloffame/      # Hall of Fame sections
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── Testimonials.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── BackToTop.tsx
├── public/              # Static assets (images, etc.)
├── .github/workflows/   # CI/CD
│   └── deploy-vercel.yml
└── demo/                # Standalone HTML demos
```

## Deploy to Vercel

Deployment is automated with **GitHub Actions**. Pushing to `main` or running the workflow manually triggers a deploy.

### 1. Add GitHub secrets

In your repo: **Settings → Secrets and variables → Actions**, add:

| Secret              | Where to get it |
|---------------------|-----------------|
| `VERCEL_TOKEN`      | [Vercel Account → Tokens](https://vercel.com/account/tokens) — create a token (e.g. “GitHub Actions”). |
| `VERCEL_ORG_ID`     | Vercel project → **Settings → General** (or from `.vercel/project.json` after `vercel link`). |
| `VERCEL_PROJECT_ID` | Same as above. |

### 2. Link project (one-time, if needed)

If the repo isn’t linked to a Vercel project yet:

```bash
bunx vercel link
```

Copy `orgId` and `projectId` from `.vercel/project.json` into the GitHub secrets above.

### 3. Push to deploy

```bash
git push origin main
```

Workflow runs at: **Actions → Deploy to Vercel**.

---

[Next.js Docs](https://nextjs.org/docs) · [Vercel](https://vercel.com)
