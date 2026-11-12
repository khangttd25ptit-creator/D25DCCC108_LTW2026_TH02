import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Không tải được câu hỏi');
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route
          index
          element={<Home playerName={playerName} setPlayerName={setPlayerName} />}
        />
        <Route
          path="play"
          element={<Play questions={questions} playerName={playerName} />}
        />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History />} />
        <Route path="questions" element={<Questions questions={questions} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;