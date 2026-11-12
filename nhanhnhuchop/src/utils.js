import { POINTS, BONUS_PER_SECOND, STARS } from './data';

export const calcPoints = (question, timeLeft) =>
  POINTS[question.level] + timeLeft * BONUS_PER_SECOND;

export const calcTotal = (answers) =>
  answers.reduce((total, item) => total + item.points, 0);

export const getStars = (correctCount) =>
  STARS.find((item) => correctCount >= item.min);