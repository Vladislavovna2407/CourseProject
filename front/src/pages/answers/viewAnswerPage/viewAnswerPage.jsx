import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { getAnswer, getTemplate } from '../../../Api/Api.js'
import Header from "../../../Components/header/header.jsx";

export default function ViewAnswerPage() {
  const [model, setModel] = useState(new Model());
  const params = useParams()

  const templateId = params.templateId;
  const answerId = params.answerId;
  //survey.showPreview()

  useEffect(() => {
    getTemplate(templateId,)
      .then(template => {
        getAnswer(templateId, answerId)
          .then(answer => {
            const survey = new Model(template);
            survey.data = answer;
            //survey.showPreview();
            survey.showCompleteButton = false;
            survey.mode = "display"
            setModel(survey);
          })
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Survey model={model} />
    </div>
  )
}