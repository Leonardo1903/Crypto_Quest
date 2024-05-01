import userIcon from "../assets/user.svg";
import arrowIcon from "../assets/arrow1.svg";

function Header() {
  return (
    <div className="flex justify-around my-4">
      {/* <h1 className="text-2xl ml-4">Name</h1> */}
      {/* <div className="flex items-center space-x-2 mr-4">
        <img src={userIcon} alt="User Icon" className="w-6 h-6" />
        <img src={arrowIcon} alt="Dropdown Icon" className="w-4 h-4" />
      </div> */}
    </div>
  );
}

export default Header;
