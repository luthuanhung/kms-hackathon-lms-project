-- CreateTable
CREATE TABLE "USERS" (
    "user_id" UUID NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "STUDENTS" (
    "user_id" UUID NOT NULL,
    "gpa" DECIMAL(3,2),
    "portfolio_clips" JSONB,
    "ai_dependency_index" DOUBLE PRECISION,

    CONSTRAINT "STUDENTS_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "TEACHERS" (
    "user_id" UUID NOT NULL,
    "staff_code" VARCHAR(20) NOT NULL,
    "department" VARCHAR(100) NOT NULL,
    "bio_video_url" TEXT,

    CONSTRAINT "TEACHERS_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "TOPICS" (
    "topic_id" UUID NOT NULL,
    "managed_by" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "TOPICS_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "QUIZZES" (
    "quiz_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,
    "created_by" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty_level" INTEGER NOT NULL,
    "solution_hint" TEXT,

    CONSTRAINT "QUIZZES_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "LECTURES" (
    "lecture_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "video_url" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LECTURES_pkey" PRIMARY KEY ("lecture_id")
);

-- CreateTable
CREATE TABLE "USER_TOPIC_PROGRESS" (
    "student_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,
    "mastery_score" INTEGER NOT NULL,
    "needs_review" BOOLEAN NOT NULL,

    CONSTRAINT "USER_TOPIC_PROGRESS_pkey" PRIMARY KEY ("student_id","topic_id")
);

-- CreateTable
CREATE TABLE "QUIZ_ATTEMPTS" (
    "attempt_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "quiz_id" UUID NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "confidence_score" INTEGER NOT NULL,
    "time_spent" INTEGER NOT NULL,

    CONSTRAINT "QUIZ_ATTEMPTS_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- AddForeignKey
ALTER TABLE "STUDENTS" ADD CONSTRAINT "STUDENTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TEACHERS" ADD CONSTRAINT "TEACHERS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TOPICS" ADD CONSTRAINT "TOPICS_managed_by_fkey" FOREIGN KEY ("managed_by") REFERENCES "TEACHERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QUIZZES" ADD CONSTRAINT "QUIZZES_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "TOPICS"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QUIZZES" ADD CONSTRAINT "QUIZZES_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "TEACHERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LECTURES" ADD CONSTRAINT "LECTURES_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "TOPICS"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LECTURES" ADD CONSTRAINT "LECTURES_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "TEACHERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER_TOPIC_PROGRESS" ADD CONSTRAINT "USER_TOPIC_PROGRESS_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENTS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER_TOPIC_PROGRESS" ADD CONSTRAINT "USER_TOPIC_PROGRESS_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "TOPICS"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QUIZ_ATTEMPTS" ADD CONSTRAINT "QUIZ_ATTEMPTS_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENTS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QUIZ_ATTEMPTS" ADD CONSTRAINT "QUIZ_ATTEMPTS_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "QUIZZES"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;
