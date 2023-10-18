import React, { useEffect } from "react";
import MaterialUISwitch from "./MaterialUISwitch";
import responsive_nav from "../assets/reponsive_nav.png";

function Navbar(props) {
  const [searchInput, setSearchInput] = React.useState("");

  useEffect(() => {
    props.search(searchInput);
  }, [searchInput]);

  return (
    <div className="bg-[#f6f5f5] dark:bg-[#232323] dark:text-white w-full h-[5em] px-4 md:px-0 flex justify-between md:justify-around items-center">
      <a
        href="/"
        className="text-lg md:text-2xl font-semibold font-Pacifico tracking-wide hover:scale-110 transition-all duration-300 ease-in-out"
      >
        Image Gallery
      </a>
      <div className="hidden md:block md:w-[30em]">
        <input
          type="text"
          className="w-full h-[2.8em] text-base p-4 placeholder:text-gray-500 dark:placeholder:text-white outline-none rounded-lg shadow-xl dark:text-black dark:bg-[#858484]"
          value={searchInput}
          placeholder="Search for images here..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="hidden md:flex md:justify-around md:items-center">
        <a href="#" className="mr-8">
          Explore
        </a>
        <a href="#" className="mr-8">
          Collection
        </a>
        <a href="#" className="mr-8">
          Community
        </a>
      </div>
      <div className="w-8 text-sm font-semibold flex justify-center items-center md:flex-none md:text-base md:w-fit">
        <MaterialUISwitch sx={{ m: 1 }} onClick={props.handleThemeSwitch} />
        <span>Dark Mode</span>
      </div>
      <div className="block md:hidden">
        <img src={responsive_nav} alt="..." className="w-11" />
      </div>
    </div>
  );
}

export default Navbar;
