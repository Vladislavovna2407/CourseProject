import logo from './logo.svg';
import './App.css';
import RegisterForm from './Components/registerForm/registerForm';
import AuthorizationForm from './Components/authorizationForm/authorizationForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './Components/mainPage/mainPage';
import AdminPage from './Components/adminPage/adminPage';


const router = createBrowserRouter([
  {
    path: '/',
     element: <MainPage/>,
  },
  {
    path: '/admin',
    element: <AdminPage/>,
  },
  {
    path: '/register',
    element: <RegisterForm/>,
  },
  {
    path: '/login',
    element: <AuthorizationForm/>,
  },
  
])



function App() {
  return (
    // <div className="App">
    //   {/* <RegisterForm /> */}
    //   <AuthorizationForm />

    // </div>
    
      <RouterProvider router ={router}/>
    
  );
}

export default App;
