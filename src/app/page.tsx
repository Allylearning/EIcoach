'use client';

import {generateFeedback} from '@/ai/flows/generate-feedback';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useEffect, useState} from 'react';
import Confetti from 'react-confetti';

// Hardcoded questions and model answers
const questions = [
  {
    pillar: 'Self-Awareness',
    question:
      'What emotions do I experience regularly (more days than not), and how do they influence my decisions both on and off the pitch?',
    modelAnswer:
      'If you notice certain emotions – like frustration, anxiety, or excitement – frequently surfacing, start tracking them. Keep a performance journal noting your emotional state before, during, and after matches, training sessions, or daily events. The goal is to recognise patterns. Once you\'re aware of how specific emotions impact you, you can plan strategies to manage them. For instance, if feeling nervous often make you hesitate, practice grounding techniques like deep breathing to calm your mind.',
  },
  {
    pillar: 'Self-Regulation',
    question:
      'When I feel dis-regulated (stressed, angry, anxious), how can I stay in control and respond in a way that benefits both me and the people around me?',
    modelAnswer:
      'To manage strong emotions, develop skills like controlled breathing or mental resets. Try taking a deep breath or counting to five when stress or frustration builds. Having a "reset" cue, like clenching your fist briefly or focusing on a specific task (e.g., positioning or a short pass), can help you stay composed. You could also visualise scenarios where you stay calm under pressure, reinforcing how you want to respond. The more you practice this, the more automatic these reactions will become in high-pressure moments.',
  },
  {
    pillar: 'Empathy',
    question: 'How can I better understand the emotions and challenges the people around me are facing?',
    modelAnswer:
      'Building empathy starts with active listening and observation. During interactions, focus on picking up non-verbal cues like body language or tone of voice. Ask open-ended questions, like "How are you feeling about today’s game?" or "I notice you’re not yourself today, how are things?" This opens the door for teammates to share their concerns. Make an effort to put yourself in their boots and offer simple acts of support – like what you like or admire about them or offering to listen to them and their concerns. Small gestures, like checking in with a teammate after a tough match, can go a long way in building trust.',
  },
  {
     pillar: 'Relationship Management',
    question:
      'What actions can I take to build stronger, more positive connections with the people around me, even in tough situations?',
    modelAnswer:
      'Positive relationships thrive on clear communication and mutual respect. Start by not taking anything personally and not assuming you know what others are thinking. Set a tone of encouragement on and off the pitch – give positive feedback when teammates do well, and acknowledge their efforts. During conflicts, focus on resolving the issue, not judging, not assigning blame. Try using "I" statements when addressing misunderstandings, like "I felt overlooked during that play," rather than "You ignored me." Additionally, stay mindful of any personal biases in your frames of reference. Actively seek feedback from others and demonstrate your openness to growth by applying what you learn.',
  },
];

const CompletionScreen = ({onRetry}: {onRetry: () => void}) => {
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
        colors={["#03ffb3", "#ffffff"]}
      />
      <div className="text-4xl font-bold mb-4">Congratulations! 🎉⚽</div>
      <p className="text-lg mb-8">You have completed all the questions!</p>
      <Button onClick={onRetry} className="w-full max-w-xs font-bold" style={{backgroundColor: '#03ffb3', color: '#0e182e'}}>
        Retry
      </Button>
    </div>
  );
};

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isInputLocked, setIsInputLocked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (userInput.trim() === '') {
      alert('Please provide a response before proceeding.');
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserInput('');
      setFeedback(null);
      setIsInputLocked(false);
    } else {
      setCompleted(true);
    }
  };

  const handleSubmit = async () => {
    if (userInput.trim() === '') {
      alert('Please provide a response before submitting.');
      return;
    }

    setIsInputLocked(true);
    try {
      let feedbackData = await generateFeedback({
        currentQuestion: currentQuestion.question,
        userInput: userInput,
        modelAnswer: currentQuestion.modelAnswer,
      });

      setFeedback(feedbackData.feedback);
    } catch (error) {
      console.error('Failed to generate feedback:', error);
      setFeedback('Failed to generate feedback. Please try again.');
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserInput('');
     setFeedback(null);
    setIsInputLocked(false);
    setCompleted(false);
  };

  // Animation using useEffect (simple fade-in effect)
   const [hasMounted, setHasMounted] = useState(false);
   useEffect(() => {
     setHasMounted(true);
   }, []);

   if (!hasMounted) {
     return null; // Or a loading indicator
   }

  if (completed) {
    return <CompletionScreen onRetry={handleRetry} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white" style={{ backgroundColor: '#0e182e', fontFamily: 'Satoshi, sans-serif' }}>
      <Card className="w-full max-w-4xl p-4" style={{ backgroundColor: '#0e182e', color: 'white', border: 'none' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {`Question ${currentQuestionIndex + 1}/${questions.length} - ${currentQuestion.pillar}`}
          </CardTitle>
          <CardDescription className="text-white text-sm">{currentQuestion.question}</CardDescription>
           <div className="text-sm text-white font-bold mb-2" style={{ color: '#03ffb3' }}>Write in your reflections in the field below.</div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Textarea
            placeholder="Reflect on this question..."
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            disabled={isInputLocked}
            className="mb-4 w-full text-sm"
            style={{height: '200px', fontSize: '1rem'}}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          {!isInputLocked ? (
            <Button onClick={handleSubmit} className="w-full font-bold" style={{backgroundColor: '#03ffb3', color: '#0e182e'}} >
              Submit
            </Button>
          ) : (
            feedback && (
              <div className="mt-4">
                <p className="font-semibold">Feedback:</p>
                <p className="text-sm">{feedback}</p>
                <Button onClick={handleNextQuestion} className="w-full mt-4 font-bold"  style={{backgroundColor: '#03ffb3', color: '#0e182e'}}>
                  Next
                </Button>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

