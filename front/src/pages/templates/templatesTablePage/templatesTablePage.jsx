import { Fragment, useState, useEffect } from 'react'
import './templatesTablePage.css'
import Header from '../../../Components/header/header';
import { getAllTemplates, deleteTemplate } from '../../../Api/Api.js'

export default function TemplatesTablePage() {
  let [templates, setTemplates] = useState([]);

  async function refreshTemplatesTable() {
    try {
      const templates = await getAllTemplates();
      setTemplates(templates);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeTemplate(id) {
    try {
      await deleteTemplate(id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const refresh = async () => await refreshTemplatesTable();
    refresh().catch(console.error);
  }, []);

  function renderMyAnswers(template) {
    if (template.ownAnswerId) {
      return (
        <a className='links btn btn-outline-primary mx-1 color-blue' href={`/templates/${template.templateId}/answers/${template.ownAnswerId}`}><i class="bi bi-eye"></i></a>
      )
    }

    return (
      <a className='links btn btn-outline-dark mx-1 color-dark' href={`/templates/${template.templateId}/answers`}><i class="bi bi-card-list"></i></a>
    )
  }

  function renderActions(template) {
    return (
      <Fragment>
        <a className='links btn btn-outline-primary mx-1 color-blue' href={`/templates/${template.templateId}/view`}><i class="bi bi-eye"></i></a>
        <a className='links btn btn-outline-success mx-1 color-green' href={`/templates/${template.templateId}/edit`}><i class="bi bi-pencil"></i> </a>
        <a className='links btn btn-outline-danger mx-1 color-red' href='' onClick={() => { removeTemplate(template.templateId) }}><i className="bi bi-trash"></i></a>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Header />
      <div className="container position">
        <table className="table table-secondary table-hover table-striped ">
          <caption className="caption">List of templates</caption>
          <thead className='thead-light' >
            <tr>
              <th scope="col">
              </th>
              <th scope="col">Name of template</th>
              <th scope="col">Replies</th>
              <th scope="col">My answers</th>
              <th scope="col">The author</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.templateId}>
                <th scope="row"></th>
                <td><a className='links' href={`/templates/${template.templateId}`}>{template.title}</a></td>
                <td>{template.answerCount}</td>
                <td>{renderMyAnswers(template)}</td>
                <td>{template.authorName}</td>
                <td>{renderActions(template)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

