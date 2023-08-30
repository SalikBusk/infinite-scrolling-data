import React from 'react';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Index from './Pages/Index';
import Pagination from './Pages/Pagination'
import Infinite from './Pages/Infinite'
import ViewPort from './Pages/ViewPort';
import ImagesViewPort from './Pages/ImagesViewport'

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
  },
  {
    path: "/Viewport",
    element: <ViewPort/>,
  },
  {
    path: "/ViewportImages",
    element: <ImagesViewPort/>,
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
