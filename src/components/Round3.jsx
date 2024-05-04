import { useState, useEffect } from "react";
import { Stepper } from "./index";
import ReactLoading from "react-loading";
import { database } from "../appwriteConfig";

function Round1() {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    const promise = database.listDocuments(
      "662a61ff31f95f4e00a7",
      "662a6234972b96bce421"
    );

    promise.then(
      function (response) {
        setDoc(response);
        setLoading(false);
      },
      function (error) {
        console.log(error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ReactLoading type={"spin"} color={"#FFD700"} height={'10%'} width={'10%'} />
      </div>
    );
  }

  const quesData = doc.documents;
  const ques = Object.values(quesData).map((item) => item.Question);
  const allOptions = Object.values(quesData).map((item) => item.Options);
  const CorrectAnswers = Object.values(quesData).map(
    (item) => item.CorrectAnswer
  );

  const Questions = [
    {
      component: () => <div>{ques[0]} </div>,
      options: allOptions[0],
    },
    {
      component: () => <div>{ques[1]}</div>,
      options: allOptions[1],
    },
    {
      component: () => <div>{ques[2]}</div>,
      options: allOptions[2],
    },
    {
      component: () => <div>{ques[3]}</div>,
      options: allOptions[3],
    },
    {
      component: () => <div>{ques[4]}</div>,
      options: allOptions[4],
    },
    {
      component: () => <div>{ques[5]}</div>,
      options: allOptions[5],
    },
    {
      component: () => <div>{ques[6]}</div>,
      options: allOptions[6],
    },
    {
      component: () => <div>{ques[7]}</div>,
      options: allOptions[7],
    },
    {
      component: () => <div>{ques[8]}</div>,
      options: allOptions[8],
    },
    {
      component: () => <div>{ques[9]}</div>,
      options: allOptions[9],
    },
  ];

  return (
    <>
      <div className="bg-[#1A1916] text-white">
        <div className="w-screen min-h-screen flex flex-col">
          <Stepper
            Questions={Questions}
            CorrectAnswers={CorrectAnswers}
            Round={"Round2"}
          />
        </div>
      </div>
    </>
  );
}

export default Round1;
