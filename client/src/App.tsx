import React from 'react';
import './App.css';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'

const route = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
  }
]) 

function App() {
  return (
    <div className="App">
      <RouterProvider router={route}/>
    </div>
  );
}

export default App;
