# LMS Project for KMS Hackathon — AI Vibe Coding Context

This document provides a comprehensive overview of the `kms-hackathon-lms-project`, a Learning Management System (LMS) designed for the KMS Hackathon. Use this document as the primary context for any AI-assisted "vibe coding" or development tasks.

---

## 1. Project Overview

A modern LMS with two primary user roles: **Students** and **Teachers**. The application provides:
- Role-specific dashboards
- Course exploration and management
- Progress tracking and analytics
- An **Anti-Brainrot Quiz System** with confidence/time tracking
- Socratic AI chat for learning support

---

## 2. Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v16.2.4, App Router)
- **UI Library:** [React](https://react.dev/) (v19.2.4) + React Compiler
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + PostCSS
- **Icons:** `lucide-react`
- **Linting & Formatting:** ESLint
- **Drag & Drop:** `@hello-pangea/dnd` (for Ordering/Matching questions)
- **Database:** PostgreSQL (via Prisma ORM)
- **AI Integration:** Gemini API (Google Generative AI)

---

## 3. Architecture & Directory Structure

The project uses the Next.js App Router architecture. Source code is in the `src/` directory.

### Key Directories

- `src/app/`: Route definitions and page components (App Router)
- `src/components/`: Reusable UI components, grouped by role and shared usage
- `src/modules/`: Business logic, services, and models (modular monolith)
- `src/lib/`: Utilities, API helpers
- `prisma/`: Prisma schema and migrations
- `public/`: Static assets

### Routing Map (`src/app/`)

- `/` (`page.tsx`): Main landing page
- `/explore`: Browse/search courses
- `/courses/[id]`: Course details and content
- `/profile`: User profile management
- `/progress`: Student learning progress tracking
- `/student`: **Student Dashboard**
- `/teacher`: **Teacher Dashboard**
- `/student/course`: Student's enrolled course details
- `/student/quiz/[id]`: Interactive quiz interface for students
- `/teacher/courses`: Teacher's course management
- `/teacher/quiz-builder`: Quiz/question builder for teachers

### Component Hierarchy (`src/components/`)

- **Shared:** `CourseCard.tsx`, `Navbar.tsx`, `Sidebar.tsx`
- **Student:** `StudentNavbar.tsx`, `StudentSidebar.tsx`, `StudentCourseCard.tsx`, `SocraticChat.tsx`
- **Teacher:** `TeacherNavbar.tsx`, `TeacherSidebar.tsx`, `TeacherCourseCard.tsx`
- **Questions Module:**  
  - `QuestionRenderer.tsx`: Wrapper to load the correct question type
  - `MultipleChoiceWidget.tsx`: Multiple choice questions
  - `OrderingWidget.tsx`: Sequencing (drag & drop)
  - `MatchingWidget.tsx`: Concept matching
  - `ErrorHuntWidget.tsx`: Spot the error (code/text)
  - `ConfidenceSlider.tsx`: Slider (0-100%) for confidence before submit

---

## 4. Key Features & Vibe Coding Focus

1. **Role-Based Access Control (RBAC):** UI adapts for Student/Teacher
2. **Responsive Design:** Tailwind CSS for all breakpoints
3. **Next.js Best Practices:** RSC for data, Client Components for interactivity
4. **Anti-Brainrot Quiz System:**  
   - Every question widget must include a [`ConfidenceSlider`](src/components/questions/ConfidenceSlider.tsx)
   - Track `{ answer, confidence_score, time_spent }` for every submission
   - Timer starts on mount, records `time_spent` on submit
   - No standard essay/text-input questions (no generic textarea)
5. **Socratic AI Chat:**  
   - [`SocraticChat`](src/components/student/SocraticChat.tsx) for student guidance
   - Uses `/api/ai` ([src/app/api/ai/route.ts](src/app/api/ai/route.ts)), supports image input and context
   - AI returns hints, diagrams (Mermaid), and Socratic prompts (never direct answers)
6. **Quiz Builder for Teachers:**  
   - `/teacher/quiz-builder` for creating interactive questions
   - Must include a `solution_hint` field for AI context
   - Supports live preview of question widgets

---

## 5. Implementing Question Types (`src/components/questions/`)

- **MULTIPLE_CHOICE:**  
  - Props: `question`, `options`, `solution`
  - UI: Radio/select options, confidence slider, submit
- **ORDERING:**  
  - Props: `items` (scrambled array)
  - UI: Drag-and-drop to reorder, confidence slider, submit
- **MATCHING:**  
  - Props: `premises`, `responses`
  - UI: Two columns, select pairs, confidence slider, submit
- **ERROR_HUNT:**  
  - Props: `lines` (array), `correct_error_line_index`
  - UI: Clickable lines, highlight selection, confidence slider, submit

All question widgets must send `{ answer, confidence_score, time_spent }` to the parent handler.

---

## 6. AI Hooks & Socratic Logic

- Use `/api/ai` endpoint for Socratic chat and hints ([src/app/api/ai/route.ts](src/app/api/ai/route.ts))
- When a student submits an answer with high `confidence_score` but `is_correct: false`, trigger a Socratic AI prompt (placeholder: `fetch('/api/ai')`)
- AI responses should use Mermaid diagrams for logic when possible
- Teacher quiz forms must provide `solution_hint` for AI context

---

## 7. Database & Models

- **Prisma schema:** [prisma/schema.prisma](prisma/schema.prisma)
- **Key models:**  
  - `User`, `Profile`, `Course`, `Lesson`, `Enrollment`, `Assessment`, `AttemptResult`
- **Services:**  
  - All business logic is in [`src/modules/`](src/modules/index.ts)
  - Example: [`enrollmentService.enrollStudent`](src/modules/enrollments/services/index.ts)

---

## 8. Development & Contribution

- Use `"use client"` for interactive components (drag/drop, chat, quiz builder)
- All question widgets must follow the Anti-Brainrot logic (see above)
- Extend AI logic in [src/app/api/ai/route.ts](src/app/api/ai/route.ts)
- See [package.json](package.json) for scripts (`dev`, `build`, `lint`, etc.)
- Before PRs for quiz/AI logic, review this guide and [README.md](README.md)

---

## 9. Internal Docs & References

- [README.md](README.md): Project overview, setup, and architecture
- [package.json](package.json), [tsconfig.json](tsconfig.json): Scripts and config
- [src/modules/index.ts](src/modules/index.ts): All exported services/models

---

**Note:**  
This guide is for AI-assisted "vibe coding" and rapid development. Always ensure new features follow the Anti-Brainrot and Socratic principles. For any new question type or AI integration, update this guide accordingly.