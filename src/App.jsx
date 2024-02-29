import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import PostDetails from './components/PostsDetails/PostDetails';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/" element={<Posts />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
