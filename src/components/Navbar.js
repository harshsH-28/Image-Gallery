import React, { useEffect } from "react";
import MaterialUISwitch from "./MaterialUISwitch";
import TextField from "@mui/material/TextField";

function Navbar(props) {
  const [searchInput, setSearchInput] = React.useState("");

  useEffect(() => {
    props.search(searchInput);
  }, [searchInput]);

  return (
    <div className="bg-[#f6f5f5] dark:bg-[#232323] dark:text-white w-full h-[5em] flex justify-around items-center">
      <a
        href="/"
        className="text-2xl font-semibold font-Pacifico tracking-wide hover:scale-110 transition-all duration-300 ease-in-out"
      >
        Image Gallery
      </a>
      <div className="w-[30em]">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search your image here"
          className="dark:bg-white"
          style={{
            backgroundColor: "white",
            outline: "none",
          }}
        />
      </div>
      <div className="flex justify-around items-center">
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
      <div>
        <MaterialUISwitch sx={{ m: 1 }} onClick={props.themeSwitch} />
        <span>Dark Mode</span>
      </div>
    </div>
  );
}

export default Navbar;
