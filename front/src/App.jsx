import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/authentication/registerPage/registerForm';
import LoginPage from './pages/authentication/loginPage/loginPage';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import TemplatesTablePage from './pages/templates/templatesTablePage/templatesTablePage';
import AnswerPage from './pages/answers/answerPage/answerPage';
import ConstructorPage from './pages/templates/constructorPage/constructorPage'
import AdminPage from './pages/admin/adminPage/adminPage'
import EditTemplatePage from './pages/templates/editTemplatePage/editTemplatePage';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => redirect('/templates')
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/templates',
    element: <TemplatesTablePage />,
  },
  {
    path: '/templates/create',
    element: <ConstructorPage />,
  },
  {
    path: '/templates/:id',
    element: <EditTemplatePage />,
  },
  {
    path: '/answers/:id',
    element: <AnswerPage />,
  }
])

function App() {
  return (
    // <div className="App">
    //   {/* <RegisterForm /> */}
    //   <AuthorizationForm />

    // </div>

    <RouterProvider router={router} />
  );
}

export default App;
