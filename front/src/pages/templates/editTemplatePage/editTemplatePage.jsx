
import { useState } from "react";
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { updateTemplate, getTemplate } from '../../../Api/Api.js'
import Header from "../../../Components/header/header";


const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
  showSidebar: false,
  showLogicTab: false,
  showJSONEditorTab: false,
  showTranslationTab: false,
  questionTypes: ["text", "checkbox", "radiogroup", "boolean"],
};

export default function EditTemplatePage() {
  const navigate = useNavigate();
  let [creator, setCreator] = useState();
  const params = useParams()

  const templateId = params.templateId;

  if (creator === undefined) {

    creator = new SurveyCreator(creatorOptions);
    creator.toolbox.forceCompact = true;
    creator.pageEditMode = 'bypage';
    creator.toolbox.changeCategories([
      { name: "text", category: "Panels" },
      { name: "checkbox", category: "Panels" },
      { name: "radiogroup", category: "Panels" },
      { name: "boolean", category: "Panels" },
    ]);

    creator.saveSurveyFunc = async (no, callback) => {
      await updateTemplate(templateId, creator.JSON);
      callback(no, true);
    };

    getTemplate(templateId)
      .then(template => {
        creator.JSON = template;
      })
      .catch(error => {
        console.log(error);
        navigate('/');
      })

    setCreator(creator);
  }

  return (
    <div className="App">
      <Header />
      <SurveyCreatorComponent creator={creator} />
    </div>
  )
}