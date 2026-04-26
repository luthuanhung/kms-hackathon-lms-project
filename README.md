# AI Education LMS — KMS Hackathon

A modern LMS demo focused on "Anti-Brainrot" (cognitive training) for two main roles: **Student** and **Teacher**. Built with Next.js (App Router), TypeScript, Tailwind CSS, and a modular monolith architecture (services/models/components).

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started-local)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Key Components](#key-components)
- [API & AI Hooks](#api--ai-hooks)
- [Database / Prisma](#database--prisma)
- [Development & Contribution](#development--contribution)
- [Internal Docs (Vibe Coding)](#internal-docs-vibe-coding)

---

## Overview

- Role-based dashboards for Students and Teachers.
- Interactive question system: Ordering, Matching, Multiple Choice, Error Hunt.
- Socratic AI chat for learning support.
- Tracks `confidence_score` and `time_spent` for every question (Anti-Brainrot principle).
- Modern UI/UX with Tailwind CSS and Lucide icons.

---

## Getting Started (Local)

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Setup environment:**
   - Copy `.env.example` to `.env` and fill in `JWT_SECRET`, `GEMINI_API_KEY`, etc.
3. **Migrate & generate Prisma client:**
   ```sh
   npx prisma migrate dev
   ```
4. **Start the dev server:**
   ```sh
   npm run dev
   ```
5. **Open** [http://localhost:3000](http://localhost:3000)

See [package.json](package.json) for available scripts.

---

## Architecture & Folder Structure

```
.
├── prisma/                  # Prisma schema & migrations
│   ├── schema.prisma
│   └── migrations/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/             # API routes (e.g. [src/app/api/ai/route.ts](src/app/api/ai/route.ts))
│   │   ├── student/         # Student dashboard, quiz, course pages
│   │   ├── teacher/         # Teacher dashboard, quiz-builder, course management
│   │   ├── explore/         # Course exploration
│   │   ├── progress/        # Student progress tracking
│   │   ├── profile/         # User profile
│   │   └── page.tsx         # Landing page
│   ├── components/          # Shared UI components
│   │   ├── student/         # Student-specific components (e.g. [`SocraticChat`](src/components/student/SocraticChat.tsx))
│   │   ├── teacher/         # Teacher-specific components
│   │   └── questions/       # Question widgets (see below)
│   ├── modules/             # Business logic: services & models ([src/modules/index.ts](src/modules/index.ts))
│   ├── lib/                 # Utilities, API helpers
│   └── proxy.ts             # Middleware/proxy logic
├── .env                     # Environment variables
├── package.json
├── tsconfig.json
└── DEV_GUIDE.md             # Internal developer guide
```

---

## Key Components

- **Pages:**
  - [src/app/page.tsx](src/app/page.tsx) — Landing
  - [src/app/student/page.tsx](src/app/student/page.tsx) — Student dashboard
  - [src/app/teacher/page.tsx](src/app/teacher/page.tsx) — Teacher dashboard
  - [src/app/teacher/quiz-builder/page.tsx](src/app/teacher/quiz-builder/page.tsx) — Quiz builder UI
  - [src/app/student/quiz/[id]/page.tsx](src/app/student/quiz/[id]/page.tsx) — Student quiz interface

- **Components:**
  - [`SocraticChat`](src/components/student/SocraticChat.tsx) — Socratic AI chatbot (calls `/api/ai`)
  - [`MarkdownRenderer`](src/components/MarkdownRenderer.tsx) — Markdown + Mermaid diagrams ([src/components/MermaidRenderer.tsx](src/components/MermaidRenderer.tsx))
  - [`TeacherSidebar`](src/components/Sidebar.tsx), [`StudentSidebar`](src/components/student/StudentSidebar.tsx)
  - **Question widgets** ([src/components/questions/](src/components/questions/)):
    - [`MultipleChoiceWidget`](src/components/questions/MultipleChoiceWidget.tsx)
    - [`OrderingWidget`](src/components/questions/OderingWidget.tsx) (drag & drop via `@hello-pangea/dnd`)
    - [`MatchingWidget`](src/components/questions/MatchingWidget.tsx)
    - [`ConfidenceSlider`](src/components/questions/ConfidenceSlider.tsx)
    - [`ErrorHuntWidget`](src/components/questions/ErrorHuntWidget.tsx) (spot the error)

- **Backend / Services / Models:**
  - All services/models exported from [src/modules/index.ts](src/modules/index.ts)
  - Example: [`enrollmentService.enrollStudent`](src/modules/enrollments/services/index.ts), [`authService`](src/modules/index.ts)

---

## API & AI Hooks

- **AI endpoint:** [src/app/api/ai/route.ts](src/app/api/ai/route.ts) — Handles hardcoded demo responses and Gemini API fallback (`GEMINI_API_KEY` required).
- **Socratic flow:** Client sends `{ prompt, role, image, history, context }` to `/api/ai` ([`SocraticChat`](src/components/student/SocraticChat.tsx)).
- **Quiz/Question logic:** All question widgets must send `{ answer, confidence_score, time_spent }` to parent ([DEV_GUIDE.md](DEV_GUIDE.md)).

---

## Database / Prisma

- **Schema:** [prisma/schema.prisma](prisma/schema.prisma)
- **Migrations:** [prisma/migrations](prisma/migrations)
- **Usage:** Import Prisma client in models/services (see [src/modules/common/models/index.ts](src/modules/common/models/index.ts))

---

## Development & Contribution

- **Anti-Brainrot:** All question widgets must include a [`ConfidenceSlider`](src/components/questions/ConfidenceSlider.tsx) and track `time_spent` (see [DEV_GUIDE.md](DEV_GUIDE.md)).
- **Extend AI:** Edit [src/app/api/ai/route.ts](src/app/api/ai/route.ts) for new Socratic logic or Gemini integration.
- **Frontend interactivity:** Use `"use client"` for drag/drop, chat, and quiz builder components.
- **Add features:** Fork → branch → PR with description/demo.
- **Before PR for Quiz/AI:** Read [DEV_GUIDE.md](DEV_GUIDE.md) to follow "confidence + time_spent" and Socratic hooks.

---

## Internal Docs (Vibe Coding)

- [DEV_GUIDE.md](DEV_GUIDE.md) — Architecture, directory structure, and "Anti-Brainrot" rules.
- [package.json](package.json), [tsconfig.json](tsconfig.json) — Scripts and config.

---

**Note:** This is an internal hackathon demo. Change secrets in `.env` before deploying. See [package.json](package.json) for scripts. Keep the "Anti-Brainrot" spirit when adding new question types!