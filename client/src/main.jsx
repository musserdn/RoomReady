import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import GuestPage from './pages/GuestPage.jsx';
import Home from './pages/Home.jsx';
import HouseKeepingPage from './pages/HouseKeepingPage.jsx';
import MyDay from './pages/MyDay.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UserPage from './pages/UserPage.jsx';
import RoomPage from './pages/RoomPage.jsx';

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Guest',
        element: (
          <ProtectedRoute>
            <GuestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/HouseKeeping',
        element: (
          <ProtectedRoute>
            <HouseKeepingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/MyDay',
        element: (
          <ProtectedRoute>
            <MyDay />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user',
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/room',
        element: (
          <ProtectedRoute>
            <RoomPage />
          </ProtectedRoute>
        ),
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);