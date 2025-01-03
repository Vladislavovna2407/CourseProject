import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/authentication/registerPage/registerForm';
import LoginPage from './pages/authentication/loginPage/loginPage';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import TemplatesTablePage from './pages/templates/templatesTablePage/templatesTablePage';
import CreateAnswerPage from './pages/answers/answerPage/answerPage';
import ConstructorPage from './pages/templates/constructorPage/constructorPage'
import AdminPage from './pages/admin/adminPage/adminPage'
import EditTemplatePage from './pages/templates/editTemplatePage/editTemplatePage';
import ViewTemplatePage from './pages/templates/viewTemplatePage/viewTemplatePage';
import ViewAnswerPage from './pages/answers/viewAnswerPage/viewAnswerPage';
import AnswerList from './pages/answers/answerList/answerList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TemplatesTablePage />
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
    path: '/templates/:templateId/edit',
    element: <EditTemplatePage />,
  },
  {
    path: '/templates/:templateId/answers',
    element: <CreateAnswerPage />,
  },
  {
    path: '/templates/:templateId/answers/:answerId',
    element: <ViewAnswerPage />,
  },
  {
    path: '/templates/:templateId',
    element: <AnswerList />
  },
  {
    path: '/templates/:templateId/view',
    element: <ViewTemplatePage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
