/**
 * @fileOverview Generates placeholder feedback for client-side use.
 *
 * - generateFeedback - A function that returns sample feedback instead of using server-side AI.
 * - GenerateFeedbackInput - The input type for the generateFeedback function.
 * - GenerateFeedbackOutput - The return type for the generateFeedback function.
 */

export type GenerateFeedbackInput = {
  currentQuestion: string;
  userInput: string;
  modelAnswer: string;
};

export type GenerateFeedbackOutput = {
  feedback: string;
};

export async function generateFeedback(input: GenerateFeedbackInput): Promise<GenerateFeedbackOutput> {
  const { currentQuestion, userInput, modelAnswer } = input;

  // Client-safe placeholder logic
  const feedback = `Thanks for your answer! Based on the model answer, you might also consider: ${modelAnswer} 😊`;

  return {
    feedback,
  };
}
