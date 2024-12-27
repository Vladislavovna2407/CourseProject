import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router"
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { getTemplate, saveResponse } from '../../Api/Api.js'

export default function ResponsePage() {
  const [template, setTemplate] = useState(null);
  const params = useParams()

  const templateId = params.id;

  useEffect(() => {
    getTemplate(templateId)
      .then(result => {
        setTemplate(result);
      });
  }, []);

  const survey = new Model(template);

  const surveyComplete = (survey) => {
    survey.setValue("userId", 'user-not-set-yet')

    saveResponse(templateId, survey.data)
  };

  survey.onComplete.add(surveyComplete);

  return <Survey model={survey} />;
}