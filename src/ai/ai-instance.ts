import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

console.log(
  '[AI] GOOGLE_GENAI_API_KEY present:',
  Boolean(process.env.GOOGLE_GENAI_API_KEY)
);

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: googleAI.model('gemini-2.5-flash'),
});