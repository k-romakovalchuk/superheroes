import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import 'bulma/bulma.sass';
import { Home } from './pages/Home';
import { Heroes } from './pages/Heroes';

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero/*" element={<Heroes />} />
      </Routes>
    </div>
  );
};
