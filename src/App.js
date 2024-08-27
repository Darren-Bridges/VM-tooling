import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Flatten from './components/Flatten';
import Unflatten from './components/Unflatten';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translations/flatten" element={<Flatten />} />
          <Route path="/translations/unflatten" element={<Unflatten />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
