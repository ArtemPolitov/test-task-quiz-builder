import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import QuizList from './pages/QuizList/QuizList';
import QuizCreate from './pages/QuizCreate/QuizCreate';
import QuizDetail from './pages/QuizDetail/QuizDetail';
import Header from './components/Header/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/create" element={<QuizCreate />} />
          <Route path="/quizzes/:id" element={<QuizDetail />} />
          оке<Route path="/quizzes" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
