import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import arrowRight from "../assets/arrow2.svg";
import Forward from "../assets/arrow3.svg";
import Back from "../assets/arrow4.svg";
import Modal from "./Modal"; // Import your modal component
import { account, database } from "../appwriteConfig";
import { ID } from "appwrite";

function Stepper({ Questions = [], CorrectAnswers = [], CollectionID }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margin, setMargin] = useState({ marginLeft: 0, marginRight: 0 });
  const [score, setScore] = useState(0); // Add a state for the score
  const [showModal, setShowModal] = useState(false); // Add a state for the modal visibility
  const stepRef = useRef([]);
  const [userChoices, setUserChoices] = useState(() => {
    const savedUserChoices = localStorage.getItem('userChoices');
    return savedUserChoices ? JSON.parse(savedUserChoices) : {};
  });
  const [answeredSteps, setAnsweredSteps] = useState(() => {
    const savedAnsweredSteps = localStorage.getItem('answeredSteps');
    return savedAnsweredSteps ? JSON.parse(savedAnsweredSteps) : [];
  });

  useEffect(() => {
    const savedUserChoices = localStorage.getItem('userChoices');
    if (savedUserChoices) {
      setUserChoices(JSON.parse(savedUserChoices));
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('userChoices', JSON.stringify(userChoices));
  }, [userChoices]);
  // Load answeredSteps from local storage when the component is mounted
  useEffect(() => {
    const savedAnsweredSteps = localStorage.getItem('answeredSteps');
    if (savedAnsweredSteps) {
      setAnsweredSteps(JSON.parse(savedAnsweredSteps));
    }
  }, []);

  // Save answeredSteps to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('answeredSteps', JSON.stringify(answeredSteps));
  }, [answeredSteps]);

  useEffect(() => {
    if (localStorage.getItem('submitted') === 'true') {
      alert('You have already submitted the quiz');

      setTimeout(() => {
        window.location.href = '/';
      }, 50);
    }
  }, []);

  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[Questions.length - 1].offsetWidth / 2,
    });
  }, [stepRef, Questions.length]);

  if (!Questions.length) {
    return <></>;
  }

  const calculateProgress = () => {
    return ((currentStep - 1) / (Questions.length - 1)) * 100;
  };

 
  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev === Questions.length) {
        setIsComplete(true);
        return prev;
      }
      // Check if an answer has been selected for the current step
      if (userChoices.hasOwnProperty(prev - 1)) {
        setAnsweredSteps((prevSteps) => [...prevSteps, prev]);
      }
      return prev + 1;
    });
  };


  const handlePrevious = () => {
    setCurrentStep((prev) => {
      if (prev === 1) {
        setIsComplete(false);
        return prev;
      }
      return prev - 1;
    });
  };

  const handleSkip = () => {
    setCurrentStep((prev) => {
      if (prev === Questions.length) {
        setIsComplete(true);
        return prev;
      }
      return prev + 1;
    });
  };

  const handleSubmit = () => {
    localStorage.setItem('submitted', 'true');
    var score = 0;
    Object.entries(userChoices).forEach(([questionIndex, userChoice]) => {
      const correctAnswer = CorrectAnswers[questionIndex];
      if (userChoice === correctAnswer) {
        score++;
      }
    });
    // Calculate the score here and set it

    setScore(score);
    setShowModal(true);

    const currentDate = new Date();
    const formattedTime = currentDate.toISOString();

    const promise = account.get();

    promise.then(
      function (response) {
        const teamData = {
          UserID: response.$id,
          UserName: response.name,
          Score: score,
          SubmitTime: formattedTime,
        };
        const promise = database.createDocument(
          "662a61ff31f95f4e00a7",
          CollectionID,
          ID.unique(),
          JSON.stringify(teamData)
        );

        promise.then(
          function (response) {
            console.log(response); // Success
          },
          function (error) {
            console.log(error); // Failure
          }
        );
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const handleOptionChange = (event) => {
    setUserChoices({ ...userChoices, [currentStep - 1]: event.target.value });
  };

  const ActiveComponent = () => {
    const question = Questions[currentStep - 1];
    const selectedOption = userChoices[currentStep - 1];

    return (
      <form>
        <h2 className="font-semibold h-40 bg-[#FFC200] text-[#1A1916] flex items-center text-2xl px-4">
          {question.component()}
        </h2>
        <div className="flex flex-col space-y-2 md:flex-row justify-center items-center mt-8">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="relative w-full flex justify-center items-center"
            >
              <input
                type="radio"
                id={`option${index}`}
                name="option"
                value={option}
                className="hidden"
                onChange={handleOptionChange}
              />
              <label
                htmlFor={`option${index}`}
                className="w-40 h-20 text-[#1A1916] cursor-pointer flex items-center justify-center"
                style={{
                  backgroundColor:
                    selectedOption === option ? "#ffc200" : "#D1D1D1",
                }}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </form>
    );
  };

  return (
    <>
      <div className="relative flex flex-row md:flex-row justify-between items-center mb-5 w-full">
        {Questions.map((step, index) => (
          <div
            key={index}
            ref={(element) => (stepRef.current[index] = element)}
            className="flex flex-col items-center w-screen"
          >
          <div
            className={`w-8 h-8 rounded-2xl flex justify-center items-center mb-2 z-[2] ${
              answeredSteps.includes(index + 1) || isComplete
                ? "bg-[#FFC200] text-[#1A1916]"
                : currentStep === index + 1
                ? "bg-[#FFC200] text-[#B8ACAC]"
                : "bg-[#D1D1D1]"
            }`}
          >
            <div
              className={`rounded-2xl w-6 h-6 text-center ${
                answeredSteps.includes(index + 1) || isComplete
                  ? "bg-[#FFC200]"
                  : currentStep === index + 1
                  ? "bg-[#1A1916]"
                  : "bg-[#D1D1D1]"
              } `}
            >
              {answeredSteps.includes(index + 1) || isComplete ? (
                <span>✓</span>
              ) : (
                index + 1
              )}
            </div>
          </div>
          </div>
        ))}
        <div
          className="absolute ml-0 h-1 w-full bg-[#D1D1D1] transition duration-100 ease-in-out"
          style={{
            width: `calc(100% - ${margin.marginLeft}px - ${margin.marginRight}px)`,
            marginLeft: margin.marginLeft,
            marginRight: margin.marginRight,
          }}
        >
          <div
            className=" h-full bg-[#FFC200] "
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      <div className="flex flex-row justify-between mt-6 md:mt-20">
        <button
          className="bg-[#D1D1D1] text-[#1A1916] shadow-lg flex items-center px-2 rounded-2xl md:ml-4"
          onClick={handlePrevious}
        >
          <img src={Back} className="h-3 w-3 mr-2" />
          Previous
        </button>
        <div className="flex flex-row items-baseline mr-4">
          {!isComplete && (
            <button
              className=" bg-[#FFC200] rounded-2xl px-4 shadow-lg flex flex-row items-center mb-2 md:mb-0 mr-2 "
              onClick={
                currentStep === Questions.length ? handleSubmit : handleNext
              }
            >
              {currentStep === Questions.length ? "Finish" : "Next"}
              <img src={arrowRight} className=" h-3 w-3 ml-2" />
            </button>
          )}
          {/* {currentStep < Questions.length && (
            <button
              className="text-[#FFC200] shadow-lg ml-2 flex items-center"
              onClick={handleSkip}
            >
              Skip
              <img src={Forward} className="h-3 w-3 ml-1" />
            </button>
          )} */}
        </div>
      </div>
      {showModal && <Modal score={score} onClose={() => setShowModal(false)} />}
    </>
  );
}

Stepper.propTypes = {
  Questions: PropTypes.array,
  CorrectAnswers: PropTypes.array,
};

export default Stepper;
