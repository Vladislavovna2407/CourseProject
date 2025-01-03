import './registerPage.css'
import { useState, useContext } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext"
import { registerRequest } from '../../../Api/Api';


export default function RegisterPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const { setUser } = useContext(UserContext);

  function handleName(event) {
    setName(event.target.value)
  }

  function handleEmail(event) {
    setEmail(event.target.value)
  }

  function handlePassword(event) {
    setPassword(event.target.value)
  }

  function handleConfirmPassword(event) {
    setConfirmPassword(event.target.value)
  }

  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signUpHandler();
  };

  async function signUpHandler() {
    const request = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    try {
      const user = await registerRequest(request);
      const encrypted = btoa(request.email + ':' + request.password);
      localStorage.setItem('user', `Basic ${encrypted}`)
      localStorage.setItem('current-user', JSON.stringify(user))
      setUser(user)
      navigate('/templates')
    } catch (error) {
      console.log(error)
      setError('email', {
        type: 'manual',
        message: `The user's email address already exists`,
      });
    }
  }


  return (
    <div>
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
            <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
              <h2>Register Form</h2>
              <div className="mb-3">
                <input
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  name="name"
                  type="text"
                  className="form-control size"
                  id="staticName"
                  placeholder="Name"
                  // value={name}
                  onChange={handleName}
                />
                <label htmlFor="staticName" className="visually-hidden">
                  Name
                </label>
                {errors?.name && <p className="validation">{errors.name.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="visually-hidden">
                  E-mail
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+.[^@ .]{2,}$/,
                      message: 'Email is not valid',
                    }
                  })}
                  name="email"
                  type="email"
                  className="form-control size"
                  id="inputEmail"
                  placeholder="E-mail"
                  onChange={handleEmail}
                />
                {errors?.email && <p className="validation">{errors.email.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="visually-hidden">
                  Password
                </label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
                  name="password"
                  type="password"
                  className="form-control size"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={handlePassword}
                />
                {errors?.password && <p className="validation">{errors.password.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="inputConfirmPassword" className="visually-hidden">
                  Confirm password
                </label>
                <input
                  {...register('confirmPassword', {
                    required: 'Password confirmation is required',
                    validate: (value) =>
                      value === password || "Passwords don't match",
                  })}
                  name="confirmPassword"
                  type="password"
                  className="form-control size"
                  id="inputConfirmPassword"
                  placeholder="Confirm password"
                  onChange={handleConfirmPassword}
                />
                {errors.confirmPassword && <p className="validation">{errors.confirmPassword.message}</p>}
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary mb-3 w-100"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center bg-secondary text-white">
            <div>
              <h2>Welcome!</h2>
              <p>Here you can register and start using our service <span> 'Customisable Forms' </span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}