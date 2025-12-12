'use server';

import { ai } from '@/ai/ai-instance';

export type GenerateFeedbackInput = {
  currentQuestion: string;
  userInput: string;
  modelAnswer: string;
};

export type GenerateFeedbackOutput = {
  feedback: string;
};

export async function generateFeedback(
  input: GenerateFeedbackInput
): Promise<GenerateFeedbackOutput> {
  try {
    console.log('generateFeedback input:', JSON.stringify(input, null, 2));

    const response = await ai.generate({
      config: {
        safetySettings: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      },
      prompt: `
You are an expert coach, providing emotionally supportive feedback to an athlete, helping them reflect on their emotional intelligence.

Question:
${input.currentQuestion}

User's response:
${input.userInput}

Guidance for your feedback:
${input.modelAnswer}

Rules:
- Write in UK English
- Be non-judgemental, empathetic, and encouraging
- Highlight what the learner is doing well
- Offer thoughtful suggestions based on the guidance
- Do NOT ask any questions
- Do NOT mention next steps
- Do NOT use overly casual language
- Never use the word "mate"
- Use at most ONE emoji ⚽
- If the response is unclear or very brief, reassure them gently
- If the response mentions self-harm or harm to others, suggest professional support (e.g. Samaritans)

Return ONLY the feedback text.
      `.trim(),
    });

    const text = response.text;

    if (!text) {
      console.error('❌ Empty AI response. Raw response:', JSON.stringify(response, null, 2));
      throw new Error('Empty AI response');
    }

    return { feedback: text };
  } catch (error) {
    console.warn('⚠️ generateFeedback failed, using fallback response.', error);

    return {
      feedback: `Thanks for sharing that. Here’s a helpful way to think about it: ${input.modelAnswer}`,
    };
  }
}