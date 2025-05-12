# **App Name**: EmotiCoach

## Core Features:

- Question Flow UI: Presents one EI-focused question at a time with a calming UI.
- Feedback Display: Locks input after submission and displays AI feedback below. Includes 'Next' button.
- Question Database: Hardcoded questions covering Self-Awareness, Self-Regulation, Empathy, and Relationship Management. The questions are the base for the AI analysis.
- Model Answer Repository: Hardcoded model answers corresponding to each question, used by the AI for comparison.
- AI-Powered Feedback: Analyzes the user's answer using a large language model tool, compares it to the model answer, and generates supportive feedback mirroring the user's tone.

## Style Guidelines:

- Primary Accent color: #00cf94
- Background color: #0e182e
- Clean, readable sans-serif fonts for question text and user input.
- Simple, clear icons for navigation (e.g., 'Next' arrow).
- Centered layout with generous padding for a focused experience.
- Subtle fade-in animations for questions and feedback to avoid jarring transitions.

## Original User Request:
Emotional Intelligence Game Plan — Interactive AI-Analysed Reflection

Prompt Title:
Code an interactive EI reflection tool with open-ended questions and supportive AI feedback based on user tone and model content

⸻

🎯 Goal:

Build a web-based learning interaction where users answer one EI-focused question at a time. After each response, AI provides supportive, non-judgmental feedback aligned with the tone and language used by the user, referencing best-practice strategies from a provided model answer.

⸻

💻 Key Features to Implement

1. Question Flow & Input UI
	•	Show one question at a time on the screen with a clean, calming UI.
	•	After the user submits their text, lock the input and show AI-generated feedback below.
	•	Include “Next” to go to the following question.
	•	After all four questions, display a summary reflection.

2. Questions & Model Answers

Hardcode the four questions and their corresponding model answer content (as provided in your original input).

Each question maps to a specific pillar:
	•	Self-Awareness
	•	Self-Regulation
	•	Empathy
	•	Relationship Management

3. AI Integration

Use Gemini API (or OpenAI if easier for prototyping) to:
	•	Analyze the user’s answer
	•	Compare it to the model answer
	•	Generate supportive feedback using the user’s tone and phrasing
	•	Highlight strengths, encourage reflection, and gently suggest ideas from the model content

4. Feedback Guidance for the AI

Structure prompt sent to Gemini like this:
{
  "prompt": "You are a friendly, emotionally supportive coach helping someone reflect on their emotional intelligence. Here's their response to a question:\n\nQuestion: ${currentQuestion}\n\nUser's response: ${userInput}\n\nUse this model answer for insight:\n${modelAnswer}\n\nGive them supportive feedback. Use their tone and style where possible. Be non-judgemental, empathetic, and encouraging. Highlight what they're doing well. Offer thoughtful suggestions using simple language."
}

✨ User Experience Flow
	1.	Intro screen with guidance:
	•	“Your EI Game Plan – Reflect openly and honestly”
	2.	Question 1 (Self-Awareness)
	•	User types their answer
	•	AI gives personalised feedback
	•	“Next” button appears
	3.	Repeat for all 4 questions
	4.	Final screen shows a summary and motivational message like:
“You’ve built a strong foundation in emotional intelligence. Keep reflecting, and keep growing!”
  