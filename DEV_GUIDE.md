# LMS Project for KMS Hackathon - AI Vibe Coding Context

This document provides a comprehensive overview of the `kms-hackathon-lms-project`, a Learning Management System (LMS) designed for the KMS Hackathon. Use this document as the primary context for any AI-assisted "vibe coding" or development tasks.

## 1. Project Overview
This is a modern Learning Management System built with a focus on two primary user roles: **Students** and **Teachers**. The application is structured to provide role-specific dashboards, course exploration, progress tracking, course management features, and a specialized **Anti-Brainrot Quiz System**.

## 2. Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (Version 16.2.4, App Router)
- **UI Library:** [React](https://react.dev/) (Version 19.2.4) + React Compiler
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + PostCSS
- **Icons:** `lucide-react`
- **Linting & Formatting:** ESLint
- **Drag & Drop:** `@hello-pangea/dnd` (recommended for Ordering/Matching questions)

## 3. Architecture & Directory Structure
The project follows the Next.js App Router architecture, with source code primarily located in the `src/` directory.

### Key Directories
- `src/app/`: Contains the route definitions and page components.
- `src/components/`: Contains reusable UI components, logically grouped by role and shared usage.

### Routing Map (`src/app/`)
- `/` (`page.tsx`): The main landing page.
- `/explore`: Page for users to browse and search for available courses.
- `/courses/[id]`: Dynamic route for viewing individual course details and content.
- `/profile`: User profile management.
- `/progress`: Tracking page for student learning progress.
- `/student`: The dedicated **Student Dashboard**.
- `/teacher`: The dedicated **Teacher Dashboard**.
- `/quiz/[quiz_id]` **(NEW)**: The interactive exam interface for students.
- `/teacher/quiz-builder` **(NEW)**: Interface for teachers to create interactive questions.

### Component Hierarchy (`src/components/`)
Components are divided into Shared, Student-specific, Teacher-specific, and the new **Questions** module.

#### 1. Shared Components
- `CourseCard.tsx`, `Navbar.tsx`, `Sidebar.tsx`

#### 2. Student Components (`src/components/student/`)
- `StudentNavbar.tsx`, `StudentSidebar.tsx`, `StudentCourseCard.tsx`

#### 3. Teacher Components (`src/components/teacher/`)
- `TeacherNavbar.tsx`, `TeacherSidebar.tsx`, `TeacherCourseCard.tsx`

#### 4. Question Module Components (`src/components/questions/`) - **NEW**
- `QuestionRenderer.tsx`: The main wrapper that reads the `type` of question and dynamically loads the correct component below.
- `ErrorHuntWidget.tsx`: Component for "Spot the Error" questions (renders code/text with selectable lines).
- `OrderingWidget.tsx`: Component for "Sequencing" questions (drag and drop to reorder).
- `MatchingWidget.tsx`: Component for "Concept Matching" questions.
- `ConfidenceSlider.tsx`: The slider (0-100%) that students must fill out before submitting any answer.

## 4. Key Features to Implement / Vibe Coding Focus Areas

1.  **Role-Based Access Control (RBAC):** UI adapts based on `Student` vs `Teacher`.
2.  **Responsive Design:** Use Tailwind CSS for mobile/tablet/desktop.
3.  **Next.js Best Practices:** RSC for data fetching, Client Components for interactivity.

## 5. 🤖 Vibe Coding Instructions for the AI Assistant

**Dear AI Assistant (Cursor/Copilot), when requested to build features for the Quiz/Question module, strictly adhere to the following logic:**

### 5.1. The "Anti-Brainrot" Core Logic
- **No standard Textareas:** Do not generate standard essay/text-input questions.
- **Confidence Tracking:** Every question component MUST include a `ConfidenceSlider.tsx` before the submit button. State must capture `{ answer, confidence_score, time_spent }`.
- **Time Tracking:** Start a timer when the component mounts. Record `time_spent` on submit.

### 5.2. Implementing Question Types (`src/components/questions/`)
- **ERROR_HUNT:**
  - Input props: A string of text or code split by lines, and the `correct_error_line_index`.
  - UI: Render lines as clickable blocks. Highlight the selected block.
  - Action: User clicks the line they think contains the error.
- **ORDERING:**
  - Input props: An array of scrambled items.
  - UI: Use a drag-and-drop library (e.g., `@hello-pangea/dnd` or native HTML5 DnD).
  - Action: User drags items into the correct chronological order.
- **MATCHING:**
  - Input props: Two arrays (Premises and Responses).
  - UI: Two columns. User draws lines or selects pairs. 

### 5.3. System Prompts & AI Hooks
- Leave placeholder API calls for the "Socratic AI Engine" (e.g., `fetch('/api/ask-socratic')`) that trigger when a student submits an answer with high `confidence_score` but the answer is `is_correct: false`.
- Ensure all teacher forms in `/teacher/quiz-builder` include a field for `solution_hint` so teachers can provide the context the AI needs to generate Socratic questions.