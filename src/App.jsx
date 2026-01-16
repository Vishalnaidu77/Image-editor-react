import React from 'react'
import Editing from './Pages/Editing'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Pages/AppLayout'
import Home from './Pages/Home'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/editing",
          element: <Editing />
        }
      ]
    }
  ])

  return (
    <div className='bg-[#111] min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
