import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../nav/nav";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import './constructorForm.css';

let url = "http://localhost:3001";
const authKeyName = 'user';

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
  showSidebar: false,
  //questionTypes: ["text", "checkbox", "radiogroup", "boolean"],
};

export default function ConstructorForm() {
  let [creator, setCreator] = useState();
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
      console.log();

      const payload  = JSON.stringify(creator.JSON)
      console.log(payload);

      const response = await fetch(url + '/templates', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(authKeyName),
        },
        body: payload
      })

      callback(no, true);
    };

    setCreator(creator);
  }
  //creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);

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