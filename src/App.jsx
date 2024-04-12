import React from 'react';
import Home from './component/Home';
import { BrowserRouter } from "react-router-dom";
import AllRoute from './component/AllRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AllRoute />
    </BrowserRouter>
  )
}

export default App;