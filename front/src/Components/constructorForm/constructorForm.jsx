import React, { Fragment, useState } from 'react';
import { Container, Button, Form } from 'react';
import './constructorForm.css'
import bootstrap from 'bootstrap';
import ButtonPlus from '../buttonPlus/buttonPlus';

export default function ConstructorForm () {
    return(
       <Fragment>
           <div className='wrapper'>
            <div  className='form-container'>
           <form  className="custom-form" >
            <div>
              <input
                className="bottom-border-input"
                id="title"
                value="Title on new form"
                name='title'
              />
              {/* <label htmlFor="title" className="visually-hidden">
                Title on new form
              </label> */}
            </div>
            <div>
              {/* <label htmlFor="inputEmail" className="visually-hidden">
                E-mail
              </label> */}
              <textarea
                name="description"
                className="bottom-border-input"
                id="textareaDecription"
                placeholder="Description"
              />
             </div>
            <div className="form-group row p-8">
              <label htmlFor="typeOfForm" className='p-8'>
                Choose the type of form:
              </label>
              <select name="" id="typeOfForm" className='w-150 m-8 '>
                  <option value="public" >Public form</option>
                  <option value="private">Private form</option>
              </select>
            </div>
            <div className="form-group row p-8">
              <label htmlFor="topicOfForm" className='p-8'>
                Choose the topic of form:
              </label>
               <select name="" id="topicOfForm" className='w-150 m-8'>
                  <option value="education">Education</option>
                  <option value="quiz">Quiz</option>
                  <option value="other">Other</option>
              </select>
            </div>
            <div className='button-container'>
            <div className=" p-8">
              <button
                type="submit"
                className="btn btn-primary color mt-16"
              >
                Submit
              </button>
            </div>
            <div className="p-8">
            <button
                type="submit"
                className="btn btn-danger mt-16"
              >
             Delete
              </button>
          </div>
            </div>
          </form>
          </div>
          <div className='containerOfIcons'>
          <ButtonPlus  hoverText={'Add a  string question'}/>
          <ButtonPlus hoverText={'Add a textarea question'}/>
          <ButtonPlus hoverText={'Add a number question'}/>
          <ButtonPlus hoverText={'Add a checkbox question'}/>
          </div>
           </div>
       </Fragment>
    )



}