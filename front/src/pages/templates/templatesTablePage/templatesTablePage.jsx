import { Fragment, useState, useEffect } from 'react'
import './templatesTablePage.css'
import Header from '../../../Components/header/header';
import { getAllTemplates } from '../../../Api/Api.js'

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

  useEffect(() => {
    const refresh = async () => await refreshTemplatesTable();
    refresh().catch(console.error);
  }, []);

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
              <th scope="col">The author</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.templateId}>
                <th scope="row"></th>
                <td><a href="">{template.title}</a></td>
                <td>0</td>
                <td>{template.authorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

