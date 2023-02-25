import React, { useEffect } from "react";
import likesBlack from "../assets/black_like.png";
import likesWhite from "../assets/white_like.png";

function ImageCard(props) {
  const handleClick = () => {
    props.onOnModal(props.imgId);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col flex-1 flex-grow md:flex-auto xl:flex-initial w-[75vw] h-[10vh] md:w-[346px] md:h-[270px] my-20 mx-5 xl:mx-10 hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
    >
      <img
        src={props.img_thumb}
        alt=""
        className="rounded-t-lg object-cover w-full h-[10em] md:h-[20em]"
      />
      <div className="bg-white dark:bg-[#141414] flex justify-between items-center px-2 py-4 rounded-b-lg shadow-xl">
        <div className="text-[#4F4F4F] dark:text-[#E5E5E5] flex justify-center items-center">
          <img
            src={props.userImg}
            alt=""
            className="rounded-3xl w-4 mr-1 md:w-8 md:mr-2"
          />
          <div className="flex flex-col text-xs md:text-sm">
            <span className="font-semibold">{props.name}</span>
            <span>@{props.username}</span>
          </div>
        </div>
        <div className="dark:text-white flex justify-center items-center">
          <img
            src={props.theme === "light" ? likesBlack : likesWhite}
            alt="..."
            className="w-4 mr-1 md:w-5 md:mr-2"
          />
          <span className="text-xs md:text-base">{props.likes} Likes</span>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
