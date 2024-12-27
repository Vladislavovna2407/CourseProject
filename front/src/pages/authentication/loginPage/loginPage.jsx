import bootstrap from "bootstrap"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import './loginPage.css'
import { useForm } from "react-hook-form"


export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let url = "http://localhost:3001";

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);

  };

  const navigate = useNavigate();

  function signUp() {
    navigate('/register')
  }

  // function goToAdmin(){
  //   navigate('/admin')
  // }

  function handleEmail(event) {
    setEmail(event.target.value)
  }

  function handlePassword(event) {
    setPassword(event.target.value)
  }

  async function signInHandler() {
    const request = {
      email: email,
      password: password
    }

    const response = await fetch(url + '/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    })

    if (response.ok) {
      const encrypted = btoa(request.email + ':' + request.password);
      localStorage.setItem('user', `Basic ${encrypted}`)
      navigate('/admin')
    } else {
      const json = await response.json();
      console.log(json.message)
    }

  }






  return (
    <div>
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
            <form onSubmit={handleSubmit(onSubmit)} >
              <h2 className="row justify-content-center mb-4">Authorization</h2>
              <div className="mb-3">
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
                  id="staticEmail2"
                  placeholder="E-mail"
                  // value={email}
                  onChange={handleEmail}
                />
                <label htmlFor="staticEmail2" className="visually-hidden">
                  Email
                </label>
                {errors?.email && <p className="validation">{errors.email.message}</p>}
              </div>
              <div className="mb-3">
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
                  id="inputPassword2"
                  placeholder="Password"
                  // value={password}
                  onChange={handlePassword}
                />
                <label htmlFor="inputPassword2" className="visually-hidden">
                  Password
                </label>
                {errors?.password && <p className="validation">{errors.password.message}</p>}
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary mb-3 w-100"
                  onClick={signInHandler}
                >
                  Sign in
                </button>
              </div>
              <div>
                <div>
                  Don't have an account?
                  <a className="breadcrumb-item" onClick={signUp}>
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center bg-secondary text-white">
            <div>
              <h2>Login to the service</h2>
              <p>Here you can continue  using <span> 'Customisable Forms' </span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}