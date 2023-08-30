import React from 'react';
import './App.css';


import { QueryClientProvider } from '@tanstack/react-query';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'
import Index from './Pages/Index';
import Pagination from './Pages/Pagination'
import Infinite from './Pages/Infinite'

const route = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path: "/pagination",
    element: <Pagination/>,
  },
  {
    path: "/infinite",
    element: <Infinite />
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
