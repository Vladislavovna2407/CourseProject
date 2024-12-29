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
        <a className='links' href={`/templates/${template.templateId}/answers/${template.ownAnswerId}`}>View</a>
      )
    }

    return (
      <a className='links' href={`/templates/${template.templateId}/answers`}>Fill form</a>
    )
  }

  function renderActions(template) {
    return (
      <Fragment>
        <a className='links' href=''>View | </a>
        <a className='links' href={`/templates/${template.templateId}`}>Edit | </a>
        <a className='links' href='' onClick={() => { removeTemplate(template.templateId) }}>Delete</a>
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

