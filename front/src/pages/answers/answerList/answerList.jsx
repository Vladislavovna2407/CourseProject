import Header from "../../../Components/header/header"


export default function AnswerList (){

    let mok = [{
        name: 'first',
        answe: 'ira',
        id: 1
    },
    { name: 'first',
    answe: 'ira',
    id:2,
},
{name: 'first',
answe: 'ira',
id:3,
}
    ]
    
    return(
        <div>
             <Header />
       <div className="container position">
        <table className="table table-secondary table-hover table-striped ">
          <caption className="caption">List of responders</caption>
          <thead className='thead-light' >
            <tr>
              <th scope="col">
              </th>
              <th scope="col">Name of template</th>
              <th scope="col">Responders</th>
            </tr>
          </thead>
          <tbody>
            {mok.map((responder) => (
              <tr key={responder.id}>
                <th scope="row"></th>
                <td>{responder.name}</td>
                <td>{responder.answe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    )
}