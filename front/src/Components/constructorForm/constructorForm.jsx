import { useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import './constructorForm.css'

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
  showSidebar: false,
  //questionTypes: ["text", "checkbox", "radiogroup", "boolean"],
};

export default function ConstructorForm() {
  let [creator, setCreator] = useState();

  if (creator === undefined) {

    creator = new SurveyCreator(creatorOptions);

    creator.toolbox.forceCompact = true;
    // creator.toolbox.changeCategories([
    //   { name: "text", category: "Panels" },
    //   { name: "checkbox", category: "Panels" },
    //   { name: "radiogroup", category: "Panels" },
    //   { name: "boolean", category: "Panels" },
    // ]);

    creator.saveSurveyFunc = (no, callback) => {
      console.log(JSON.stringify(creator.JSON));
      callback(no, true);
    };

    setCreator(creator);
  }
  //creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);

  return (
    <div className="App">
      <SurveyCreatorComponent creator={creator} />
    </div>
  )
}