import { assessmentModel, attemptModel } from '../models';

export const assessmentService = {
  getAssessmentById: async (id: string) => {
    return await assessmentModel.findById(id);
  },

  getLessonAssessments: async (lessonId: string) => {
    return await assessmentModel.findByLesson(lessonId);
  },

  createAssessment: async (data: { lessonId: string; type: string; content: string }) => {
    return await assessmentModel.create(data);
  },

  updateAssessment: async (id: string, data: any) => {
    return await assessmentModel.update(id, data);
  },

  deleteAssessment: async (id: string) => {
    return await assessmentModel.delete(id);
  },
};

export const attemptService = {
  getAttemptById: async (id: string) => {
    return await attemptModel.findById(id);
  },

  getUserAttempts: async (userId: string) => {
    return await attemptModel.findByUser(userId);
  },

  getAssessmentAttempts: async (assessmentId: string) => {
    return await attemptModel.findByAssessment(assessmentId);
  },

  submitAttempt: async (userId: string, assessmentId: string, score: number, isCorrect: boolean) => {
    return await attemptModel.create({
      userId,
      assessmentId,
      score,
      isCorrect,
    });
  },

  getUserAssessmentAttempts: async (userId: string, assessmentId: string) => {
    return await attemptModel.getUserAssessmentAttempts(userId, assessmentId);
  },

  getUserScore: async (userId: string, assessmentId: string) => {
    const attempts = await attemptModel.getUserAssessmentAttempts(userId, assessmentId);
    if (attempts.length === 0) return null;

    const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const avgScore = totalScore / attempts.length;

    return {
      attempts: attempts.length,
      averageScore: avgScore,
      highestScore: Math.max(...attempts.map(a => a.score)),
      lastAttempt: attempts[0],
    };
  },
};
