import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'
import { getTemplate, getAnswers, deleteAnswer } from '../../../Api/Api.js'
import Header from "../../../Components/header/header"


export default function AnswerList() {
  let [template, setTemplate] = useState({});
  let [answers, setAnswers] = useState([]);
  const params = useParams()
  const navigate = useNavigate();

  const templateId = params.templateId;

  useEffect(() => {
    loadTemplate(templateId).then(() => {
      loadAnswers(templateId);
    })
  }, []);

  async function loadTemplate(id) {
    try {
      const templ = await getTemplate(id);
      setTemplate(templ);
    } catch (error) {
      console.log(error);
      navigate('/not-found')
    }
  }

  async function loadAnswers(id) {
    try {
      const answers = await getAnswers(id);
      setAnswers(answers);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeAnswer(id) {
    try {
      await deleteAnswer(templateId, id);
    } catch (error) {
      console.error(error);
    }
  }

  function renderActions(answer) {
    return (
      <Fragment>
        <a className='links btn btn-outline-primary mx-1 color-blue' href={`/templates/${templateId}/answers/${answer.answerId}`}><i className="bi bi-eye"></i></a>
        <a className='links btn btn-outline-danger mx-1 color-red' href='' onClick={() => { removeAnswer(answer.answerId) }}><i className="bi bi-trash"></i></a>
      </Fragment>
    )
  }

  return (
    <div>
      <Header />
      <div className="container position">
        <table className="table table-secondary table-hover table-striped ">
          <caption className="caption">List of answers</caption>
          <thead className='thead-light' >
            <tr>
              <th scope="col"></th>
              <th scope="col">Responder</th>
              <th scope="col">Actions</th>
              <th>Template</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => (
              <tr key={answer.answerId}>
                <th scope="row"></th>
                <td>{answer.responderName}</td>
                <td>{renderActions(answer)}</td>
                 <td>{template.title}</td>
                 <td>{template.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}