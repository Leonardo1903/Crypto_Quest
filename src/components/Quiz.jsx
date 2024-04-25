import Stepper from "./Stepper";

import Header from "./Header";

const Questions = [
  {
    component: () => <div>Question 1</div>,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    component: () => <div>Question 2</div>,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    component: () => <div>Question 3</div>,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    component: () => <div>Question 4</div>,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    component: () => <div>Question 5</div>,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
];
function Quiz() {
  return (
    <>
      <div className="bg-[#1A1916] text-white flex flex-col justify-center items-center">
        <div className="w-screen min-h-screen">
          <Header/>
          <hr className="mb-4" />
          <Stepper Questions={Questions} />
        </div>
      </div>
    </>
  );
}

export default Quiz;
