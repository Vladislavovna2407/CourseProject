import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/authentication/registerPage/registerForm';
import LoginPage from './pages/authentication/loginPage/loginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TemplatesTablePage from './pages/templates/templatesTablePage/templatesTablePage';
import AnswerPage from './pages/answers/answerPage/answerPage';
import ConstructorPage from './pages/templates/constructorPage/constructorPage'
import AdminPage from './pages/admin/adminPage/adminPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TemplatesTablePage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    //path: '/constructor/:id',
    path: '/constructor',
    element: <ConstructorPage />,
  },
  {
    path: '/forms/:id',
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
