import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';
import { calcPoints, calcTotal } from '../utils';
import Countdown from '../components/Countdown';
import TimeBar from '../components/TimeBar';
import ScorePanel from '../components/ScorePanel';
import QuestionCard from '../components/QuestionCard';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();

  const [gameQuestions] = useState(() =>
    questions.filter((q) => !q.reserve)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState('countdown');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [lastBonus, setLastBonus] = useState(0);

  const currentQuestion = gameQuestions[currentIndex];
  const score = calcTotal(answers);
  const correctCount = answers.filter((a) => a.isCorrect).length;

  const handleAnswer = useCallback(
    (chosenIdx) => {
      if (status !== 'answering' || !currentQuestion) return;
      const isCorrect = chosenIdx === currentQuestion.answer;
      const earned = isCorrect ? calcPoints(currentQuestion, timeLeft) : 0;

      setSelectedIndex(chosenIdx);
      setLastBonus(earned);
      setAnswers((prev) => [
        ...prev,
        {
          id: currentQuestion.id,
          chosen: chosenIdx,
          correct: currentQuestion.answer,
          timeLeft,
          points: earned,
          isCorrect,
        },
      ]);
      setStatus('revealed');
    },
    [status, currentQuestion, timeLeft]
  );

  useEffect(() => {
    if (status !== 'countdown') return;
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown((c) => c - 1);
      } else {
        setStatus('answering');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [status, countdown]);

  useEffect(() => {
    if (status !== 'answering') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, currentIndex]);

  useEffect(() => {
    if (status === 'answering' && timeLeft === 0) {
      handleAnswer(null);
    }
  }, [status, timeLeft, handleAnswer]);

  useEffect(() => {
    if (status !== 'revealed') return;
    const timer = setTimeout(() => {
      if (currentIndex < gameQuestions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setTimeLeft(TIME_PER_QUESTION);
        setSelectedIndex(null);
        setLastBonus(0);
        setStatus('answering');
      } else {
        const finalScore = calcTotal(answers);
        const finalCorrect = answers.filter((a) => a.isCorrect).length;
        navigate('/result', {
          replace: true,
          state: { playerName, answers, score: finalScore, correctCount: finalCorrect },
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [status, currentIndex, gameQuestions.length, answers, playerName, navigate]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (status === 'countdown') {
    return <Countdown count={countdown} />;
  }

  return (
    <div>
      <ScorePanel score={score} correctCount={correctCount} lastBonus={lastBonus} />
      <TimeBar timeLeft={timeLeft} isFrozen={false} />
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          total={gameQuestions.length}
          status={status}
          focusedIndex={-1}
          selectedIndex={selectedIndex}
          onSelect={handleAnswer}
        />
      )}
    </div>
  );
};

export default Play;