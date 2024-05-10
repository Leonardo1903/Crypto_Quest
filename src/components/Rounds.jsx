import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

function Rounds() {
  const { user, logoutUser } = useAuth();
  const round1ButtonDisabled = true;
  const round2ButtonDisabled = false;
  const round3ButtonDisabled = true;
  return (
    <div className="bg-[#1A1916] text-white flex flex-col justify-center items-center">
      <div className="">
        <div className="text-4xl font-semibold">Rounds</div>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="bg-yellow-400 rounded-md px-4 py-2 my-5"
            disabled
          >
            {!round1ButtonDisabled && <Link to="/round1">Round 1</Link>}
            {round1ButtonDisabled && "Round 1"}
          </button>
          <button
            type="button"
            className="bg-yellow-400 rounded-md px-4 py-2 my-5"
            disabled
          >
            {!round2ButtonDisabled && <Link to="/round2">Round 2</Link>}
            {round2ButtonDisabled && "Round 2"}
          </button>
          <button
            type="button"
            className="bg-yellow-400 rounded-md px-4 py-2 my-5"
            disabled
          >
            {!round3ButtonDisabled && <Link to="/round3">Round 3</Link>}
            {round3ButtonDisabled && "Round 3"}
          </button>
        </div>
      </div>
      <div className="links--wrapper">
        {user ? (
          <>
            <button
              onClick={logoutUser}
              className="inline-block cursor-pointer bg-black text-white px-4 py-2 transition-colors duration-300 border border-black no-underline hover:bg-white hover:text-black"
              to="/"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            className="inline-block cursor-pointer bg-black text-white px-4 py-2 transition-colors duration-300 border border-black no-underline hover:bg-white hover:text-black"
            to="/"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Rounds;
