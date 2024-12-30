import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { getTemplate, saveResponse } from '../../../Api/Api.js'
import Header from "../../../Components/header/header.jsx";


export default function CreateAnswerPage() {
  const [template, setTemplate] = useState(null);
  const params = useParams()

  const templateId = params.templateId;

  useEffect(() => {
    getTemplate(templateId)
      .then(result => {
        setTemplate(result);
      });
  }, []);

  const survey = new Model(template);
  survey.completedHtml = "Thank you for filling out our form"

  const surveyComplete = (survey) => {
    saveResponse(templateId, survey.data);
  };

  survey.onComplete.add(surveyComplete);

  return (
    <div className="App">
      <Header />
      <Survey model={survey} />
    </div>
  )
}