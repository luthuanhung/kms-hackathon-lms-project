/*
  Warnings:

  - You are about to drop the `LECTURES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QUIZZES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QUIZ_ATTEMPTS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `STUDENTS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TEACHERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TOPICS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER_TOPIC_PROGRESS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LECTURES" DROP CONSTRAINT "LECTURES_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "LECTURES" DROP CONSTRAINT "LECTURES_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "QUIZZES" DROP CONSTRAINT "QUIZZES_created_by_fkey";

-- DropForeignKey
ALTER TABLE "QUIZZES" DROP CONSTRAINT "QUIZZES_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "QUIZ_ATTEMPTS" DROP CONSTRAINT "QUIZ_ATTEMPTS_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "QUIZ_ATTEMPTS" DROP CONSTRAINT "QUIZ_ATTEMPTS_student_id_fkey";

-- DropForeignKey
ALTER TABLE "STUDENTS" DROP CONSTRAINT "STUDENTS_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TEACHERS" DROP CONSTRAINT "TEACHERS_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TOPICS" DROP CONSTRAINT "TOPICS_managed_by_fkey";

-- DropForeignKey
ALTER TABLE "USER_TOPIC_PROGRESS" DROP CONSTRAINT "USER_TOPIC_PROGRESS_student_id_fkey";

-- DropForeignKey
ALTER TABLE "USER_TOPIC_PROGRESS" DROP CONSTRAINT "USER_TOPIC_PROGRESS_topic_id_fkey";

-- DropTable
DROP TABLE "LECTURES";

-- DropTable
DROP TABLE "QUIZZES";

-- DropTable
DROP TABLE "QUIZ_ATTEMPTS";

-- DropTable
DROP TABLE "STUDENTS";

-- DropTable
DROP TABLE "TEACHERS";

-- DropTable
DROP TABLE "TOPICS";

-- DropTable
DROP TABLE "USERS";

-- DropTable
DROP TABLE "USER_TOPIC_PROGRESS";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "avatar" TEXT,
    "bio" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttemptResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptResult" ADD CONSTRAINT "AttemptResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptResult" ADD CONSTRAINT "AttemptResult_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
