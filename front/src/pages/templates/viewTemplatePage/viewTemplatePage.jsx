import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { getTemplate } from '../../../Api/Api.js'
import Header from "../../../Components/header/header.jsx";

export default function ViewAnswerPage() {
  const [model, setModel] = useState(new Model());
  const params = useParams()

  const templateId = params.templateId;

  useEffect(() => {
    getTemplate(templateId)
      .then(template => {
        const survey = new Model(template);
        survey.showCompleteButton = false;
        survey.mode = "display"
        setModel(survey);
      });
  }, []);
  return (
    <div className="App">
      <Header />
      <Survey model={model} />
    </div>
  )
}