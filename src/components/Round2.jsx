import { useState, useEffect } from "react";
import { Header, Stepper } from "./index";
import { database } from "../appwriteConfig";

function Round1() {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    const promise = database.listDocuments(
      "662a61ff31f95f4e00a7",
      "662a621faffed8b13d3e"
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
    return <div>Loading...</div>;
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
  ];

  return (
    <>
      <div className="bg-[#1A1916] text-white flex flex-col justify-center items-center">
        <div className="w-screen min-h-screen">
          <Header />
          <hr className="mb-4" />
          <Stepper Questions={Questions} CorrectAnswers={CorrectAnswers} Round={"Round2"} />
        </div>
      </div>
    </>
  );
}

export default Round1;
