import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';
import { calcPoints, calcTotal, getStars } from '../utils';
import Countdown from '../components/Countdown';
import TimeBar from '../components/TimeBar';
import ScorePanel from '../components/ScorePanel';
import PowerUps from '../components/PowerUps';
import QuestionCard from '../components/QuestionCard';

const Play = ({ questions, playerName, onFinishGame }) => {
  const navigate = useNavigate();

  const [gameQuestions, setGameQuestions] = useState(() =>
    questions.filter((q) => !q.reserve)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState('countdown');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lastBonus, setLastBonus] = useState(0);

  const [usedSwap, setUsedSwap] = useState(false);
  const [usedDouble, setUsedDouble] = useState(false);
  const [isDoubleActive, setIsDoubleActive] = useState(false);
  const [usedFreeze, setUsedFreeze] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const currentQuestion = gameQuestions[currentIndex];
  const score = calcTotal(answers);
  const correctCount = answers.filter((a) => a.isCorrect).length;

  const handleAnswer = useCallback(
    (chosenIdx) => {
      if (status !== 'answering' || !currentQuestion) return;
      const isCorrect = chosenIdx === currentQuestion.answer;
      const basePoints = isCorrect ? calcPoints(currentQuestion, timeLeft) : 0;
      const earned = isDoubleActive ? basePoints * 2 : basePoints;

      setSelectedIndex(chosenIdx);
      setLastBonus(earned);
      setAnswers((prev) => [
        ...prev,
        {
          id: currentQuestion.id,
          originalId: currentQuestion.originalId || currentQuestion.id,
          swappedToId: currentQuestion.swappedToId || null,
          chosen: chosenIdx,
          correct: currentQuestion.answer,
          timeLeft,
          points: earned,
          isCorrect,
        },
      ]);
      setStatus('revealed');
    },
    [status, currentQuestion, timeLeft, isDoubleActive]
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
    if (status !== 'answering' || isFrozen) return;
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
  }, [status, isFrozen, currentIndex]);

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
        setFocusedIndex(0);
        setLastBonus(0);
        setIsDoubleActive(false);
        setIsFrozen(false);
        setStatus('answering');
      } else {
        const finalScore = calcTotal(answers);
        const finalCorrect = answers.filter((a) => a.isCorrect).length;
        const stars = getStars(finalCorrect).stars;
        onFinishGame({
          id: Date.now(),
          name: playerName,
          score: finalScore,
          correctCount: finalCorrect,
          stars,
          playedAt: new Date().toLocaleString('vi-VN'),
        });
        navigate('/result', {
          replace: true,
          state: { playerName, answers, score: finalScore, correctCount: finalCorrect },
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [status, currentIndex, gameQuestions.length, answers, playerName, onFinishGame, navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'answering') return;
      if (e.key === 'ArrowRight') {
        setFocusedIndex((prev) => (prev % 2 === 0 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setFocusedIndex((prev) => (prev % 2 === 1 ? prev - 1 : prev));
      } else if (e.key === 'ArrowDown') {
        setFocusedIndex((prev) => (prev <= 1 ? prev + 2 : prev));
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex((prev) => (prev >= 2 ? prev - 2 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleAnswer(focusedIndex);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, focusedIndex, handleAnswer]);

  useEffect(() => {
    if (status !== 'countdown') {
      document.title = `Câu ${currentIndex + 1}/15 – đúng ${correctCount} câu`;
    }
    return () => {
      document.title = 'Nhanh như chớp';
    };
  }, [status, currentIndex, correctCount]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  const handleSwap = () => {
    const reserveQ = questions.find((q) => q.reserve && q.level === currentQuestion.level);
    if (!reserveQ) return;
    const updated = gameQuestions.map((q, idx) =>
      idx === currentIndex
        ? { ...reserveQ, originalId: q.id, swappedToId: reserveQ.id }
        : q
    );
    setGameQuestions(updated);
    setTimeLeft(TIME_PER_QUESTION);
    setIsFrozen(false);
    setUsedSwap(true);
  };

  const handleDouble = () => {
    setIsDoubleActive(true);
    setUsedDouble(true);
  };

  const handleFreeze = () => {
    setIsFrozen(true);
    setUsedFreeze(true);
  };

  if (status === 'countdown') {
    return <Countdown count={countdown} />;
  }

  return (
    <div>
      <ScorePanel score={score} correctCount={correctCount} lastBonus={lastBonus} />
      <TimeBar timeLeft={timeLeft} isFrozen={isFrozen} />
      <PowerUps
        status={status}
        usedSwap={usedSwap}
        usedDouble={usedDouble}
        isDoubleActive={isDoubleActive}
        usedFreeze={usedFreeze}
        onSwap={handleSwap}
        onDouble={handleDouble}
        onFreeze={handleFreeze}
      />
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          total={gameQuestions.length}
          status={status}
          focusedIndex={focusedIndex}
          selectedIndex={selectedIndex}
          onSelect={handleAnswer}
        />
      )}
    </div>
  );
};

export default Play;