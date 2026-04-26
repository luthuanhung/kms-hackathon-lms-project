// ...existing code...
# AI Education LMS — KMS Hackathon

Một LMS demo hướng tới trải nghiệm "Anti-Brainrot" (rèn luyện nhận thức) cho hai vai trò chính: Student và Teacher. Dự án sử dụng Next.js (App Router), TypeScript và Tailwind CSS, được tổ chức theo kiến trúc modular monolith (services / models / components).

## Mục lục
- [Tổng quan](#tổng-quan)
- [Chạy dự án](#chạy-dự-án)
- [Kiến trúc & thư mục chính](#kiến-trúc--thư-mục-chính)
- [Các thành phần quan trọng](#các-thành-phan-quan-trọng)
- [API & AI hooks](#api--ai-hooks)
- [Database / Prisma](#database--prisma)
- [Góp ý & phát triển](#góp-ý--phát-triển)
- [Tài liệu nội bộ (Vibe Coding)](#tài-liệu-nội-bộ-vibe-coding)

## Tổng quan
Ứng dụng cung cấp:
- Dashboard cho Student và Teacher.
- Hệ thống câu hỏi tương tác: Ordering, Matching, Multiple Choice, Error Hunt.
- Trò chuyện hướng dẫn dạng Socratic AI để hỗ trợ học tập.
- Theo dõi "confidence" và "time_spent" cho mỗi câu hỏi (Anti-Brainrot).

## Chạy dự án (local)
1. Cài đặt dependencies:
```sh
npm install
```
2. Tạo file `.env` (tham khảo `.env` trong repo) và đặt các biến cần thiết như `JWT_SECRET`, `GEMINI_API_KEY`, v.v.
3. Migrate & generate Prisma client (nếu cần):
```sh
npx prisma migrate dev
```
4. Chạy dev server:
```sh
npm run dev
```
5. Mở http://localhost:3000

Tham khảo [package.json](package.json) để xem scripts.

## Kiến trúc & thư mục chính
- src/app — route pages (App Router). Ví dụ: [src/app/page.tsx](src/app/page.tsx), [src/app/student/page.tsx](src/app/student/page.tsx), [src/app/teacher/page.tsx](src/app/teacher/page.tsx).
- src/components — UI components chung và theo vai trò (Student / Teacher). Ví dụ: [`TeacherSidebar`](src/components/Sidebar.tsx), [`Navbar`](src/components/Navbar.tsx).
- src/components/student — Student-specific components (ví dụ [`SocraticChat`](src/components/student/SocraticChat.tsx)).
- src/components/questions — Các widget câu hỏi: [`MultipleChoiceWidget`](src/components/questions/MultipleChoiceWidget.tsx), [`OrderingWidget`](src/components/questions/OderingWidget.tsx), [`MatchingWidget`](src/components/questions/MatchingWidget.tsx) và slider tự tin [`ConfidenceSlider`](src/components/questions/ConfidenceSlider.tsx).
- src/modules — business logic / services / models (module exports tại [src/modules/index.ts](src/modules/index.ts)).
- src/app/api — API routes ví dụ: AI endpoint [`/api/ai`](src/app/api/ai/route.ts).
- prisma — Prisma schema & migrations (xem [prisma/schema.prisma](prisma/schema.prisma) và thư mục [prisma/migrations](prisma/migrations)).

## Các thành phần quan trọng (nhanh)
- UI & pages:
  - [src/app/page.tsx](src/app/page.tsx) — landing
  - [src/app/student/page.tsx](src/app/student/page.tsx) — student dashboard
  - [src/app/teacher/page.tsx](src/app/teacher/page.tsx) — teacher dashboard
  - [src/app/teacher/quiz-builder/page.tsx](src/app/teacher/quiz-builder/page.tsx) — quiz builder UI
- Components:
  - [`SocraticChat`](src/components/student/SocraticChat.tsx) — chatbot Socratic (gửi request tới `/api/ai`).
  - [`MarkdownRenderer`](src/components/MarkdownRenderer.tsx) — render markdown + hỗ trợ Mermaid ([src/components/MermaidRenderer.tsx](src/components/MermaidRenderer.tsx)).
  - [`TeacherSidebar`](src/components/Sidebar.tsx) và [`StudentSidebar`](src/components/student/StudentSidebar.tsx).
  - Question widgets:
    - [`MultipleChoiceWidget`](src/components/questions/MultipleChoiceWidget.tsx)
    - [`OrderingWidget`](src/components/questions/OderingWidget.tsx) (drag & drop bằng `@hello-pangea/dnd`)
    - [`MatchingWidget`](src/components/questions/MatchingWidget.tsx)
    - [`ConfidenceSlider`](src/components/questions/ConfidenceSlider.tsx)

- Backend / services / models:
  - Export tổng quan services / models: [src/modules/index.ts](src/modules/index.ts)
  - Một số API / services tiện dụng:
    - [`enrollmentService.enrollStudent`](src/modules/enrollments/services/index.ts)
    - [`profileModel.findById`](src/modules/common/models/index.ts)
    - [`authService`](src/modules/index.ts) (xem export trong [src/modules/index.ts](src/modules/index.ts))

## API & AI hooks
- AI demo endpoint: [src/app/api/ai/route.ts](src/app/api/ai/route.ts) — chứa logic trả về các hardcoded demo responses và fallback call tới API (sử dụng biến môi trường `GEMINI_API_KEY`).
- Socratic flow: client gửi body gồm { prompt, role, image, history, context } tới `/api/ai` (tham khảo [`SocraticChat`](src/components/student/SocraticChat.tsx)).

## Database / Prisma
- Schema chính trong: [prisma/schema.prisma](prisma/schema.prisma)
- Migrations có trong: [prisma/migrations](prisma/migrations)
- Prisma client usage qua `prisma` import trong models (ví dụ: [src/modules/common/models/index.ts](src/modules/common/models/index.ts) chứa [`profileModel`](src/modules/common/models/index.ts)).

## Góp ý & phát triển nhanh
- Thiết kế câu hỏi phải tuân theo "Anti-Brainrot": mọi widget gửi object { answer, confidence_score, time_spent } về handler cha — xem ví dụ trong [src/components/questions/MultipleChoiceWidget.tsx](src/components/questions/MultipleChoiceWidget.tsx) và [AI_VIBE_CODING.md](AI_VIBE_CODING.md).
- Khi mở rộng AI, chỉnh sửa [src/app/api/ai/route.ts](src/app/api/ai/route.ts) — hiện có block hardcoded demo để phục vụ UX nhanh.
- Các thay đổi frontend tương tác cần giữ client components (`"use client"`) cho khu vực drag/drop, chat, form builder.

## Tài liệu nội bộ (Vibe Coding)
Các chỉ dẫn và quy ước cụ thể cho module Quiz / Question nằm trong:
- [AI_VIBE_CODING.md](AI_VIBE_CODING.md) — quy tắc "vibe coding", Anti-Brainrot, và các hướng dẫn dựng Question components.
- README này tham chiếu file cấu hình & scripts: [package.json](package.json), [tsconfig.json](tsconfig.json).

## Liên hệ / đóng góp
- Muốn thêm feature: fork repo → tạo branch → PR kèm description & demo.
- Trước khi PR cho phần Quiz/AI, đọc kỹ [AI_VIBE_CODING.md](AI_VIBE_CODING.md) để tuân thủ logic “confidence + time_spent” và hooks Socratic.

---

Phiên bản hiện tại là bản demo nội bộ cho hackathon — nhớ đổi secrets trong `.env` trước khi deploy (tham khảo [package.json](package.json) để biết scripts). Chúc bạn phát triển nhanh và giữ đúng tinh thần "Anti-Brainrot" khi thêm các dạng câu hỏi mới!