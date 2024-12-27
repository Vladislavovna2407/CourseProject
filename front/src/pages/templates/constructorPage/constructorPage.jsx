import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router"
import Nav from "../../../Components/nav/nav.jsx";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import './constructorPage.css';
import { createTemplate, getTemplate } from '../../../Api/Api.js'

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
  showSidebar: false,
  showLogicTab: false,
  showJSONEditorTab: false,
  showTranslationTab: false,
  //questionTypes: ["text", "checkbox", "radiogroup", "boolean"],
};

export default function ConstructorPage() {
  let [creator, setCreator] = useState();
  // const params = useParams()

  // const templateId = params.id;
  // console.log(`TemplateId: ${templateId}`)

  const navigate = useNavigate();

  if (creator === undefined) {

    creator = new SurveyCreator(creatorOptions);
    creator.toolbox.forceCompact = true;
    // creator.toolbox.changeCategories([
    //   { name: "text", category: "Panels" },
    //   { name: "checkbox", category: "Panels" },
    //   { name: "radiogroup", category: "Panels" },
    //   { name: "boolean", category: "Panels" },
    // ]);

    creator.saveSurveyFunc = async (no, callback) => {
      await createTemplate(creator.JSON);
      callback(no, true);
    };

    // getTemplate(templateId).then(template => {
    //   creator.JSON = template;
    // });

    setCreator(creator);
  }

  const navForConstructorPage = [{
    text: 'Main',
    onClick: handleButtonMain
  },
  {
    text: 'Users list',
    onClick: handleButtonConstructor
  },
  {
    text: 'Log out',
    onClick: goAuthorization
  },
  ]

  function handleButtonConstructor() {
    navigate("/admin")
  }

  function handleButtonMain() {
    navigate('/')
  }

  function goAuthorization() {
    navigate('/login')
  }

  return (
    <div className="App">
      <Nav buttonTexts={navForConstructorPage} />
      <SurveyCreatorComponent creator={creator} />
    </div>
  )
}