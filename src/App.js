import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Products from './pages/Products';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import DeleteProduct from './pages/DeleteProduct';
import ModifyProduct from './pages/ModifyProduct';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import UserRegistration from './pages/UserRegistration';
import { useState } from 'react';
import { UserContext } from './contexts/userContext'
import UserProfile from './pages/UserProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/termekek",
        element: <Products />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/belepes",
        element: <Login />
      },
      {
        path: "/profil",
        element: <UserProfile />
      },
      {
        path:"/regisztracio",
        element: <UserRegistration />
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />
          },
          {
            path: "/admin/termekek",
            element: <AdminProducts />
          },
          {
            path: "/admin/termek-felvitel",
            element: <AddProduct />
          },
          {
            path: "/admin/termekek/:id/torles",
            element: <DeleteProduct />
          },
          {
            path: "/admin/termekek/:id/modositas",
            element: <ModifyProduct />
          }
        ]
      }
    ]
  }
])

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
    <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App;
