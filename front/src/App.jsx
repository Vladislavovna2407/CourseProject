import logo from './logo.svg';
import './App.css';
import RegisterForm from './Components/registerForm/registerForm';
import AuthorizationForm from './Components/authorizationForm/authorizationForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ConstructorForm from './Components/constructorForm/constructorForm';
import Nav from './Components/nav/nav';
import MainPage from './Components/mainPage/mainPage';
import AdminPage from './Components/adminPage/adminPage';


const router = createBrowserRouter([
  {
    path: '/',
    // element: <ConstructorForm/>,
    // element: <AuthorizationForm />,
    // element: <Nav/>,
    //  element: <MainPage/>,
    element: <AdminPage/>,
  },
  {
    path: '/register',
    element: <RegisterForm/>,
  },
  {
    path: '/constructor',
    element: <ConstructorForm/>,
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
