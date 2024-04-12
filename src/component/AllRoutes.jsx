import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NotFound from '../components/NotFound';
import Login from './Login';
import Home from './Home';

const AllRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
  );
};

export default AllRoute;