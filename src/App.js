import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Products from './pages/Products';
import Home from './pages/Home';
import Admin from './pages/Admin';

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
        path: "/admin",
        element: <Admin />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
