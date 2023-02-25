import React from "react";
import likesBlack from "../assets/black_like.png";
import likesWhite from "../assets/white_like.png";

function Modal(props) {
  return (
    <div className="fixed bg-black bg-opacity-30 inset-0 flex justify-center items-center z-10">
      <div className="relative flex flex-col w-[388px] h-[558px] md:w-[945px] md:h-[624.52px] shadow-2xl">
        <button
          onClick={props.closeModal}
          className="absolute z-50 text-lg top-[-10px] right-[-10px] text-black font-semibold bg-white rounded-full px-2 py-1 md:px-4 md:py-2"
        >
          X
        </button>
        <img
          src={props.data.img}
          alt=""
          className="rounded-t-lg object-cover object-center w-full h-[20em] md:h-[30em]"
        />
        <div className="bg-white dark:bg-[#232323] flex flex-col px-8 pt-8 pb-8 md:pb-10 rounded-b-lg shadow-xl">
          <div className="flex justify-between items-start mb-8">
            {props.data.description && (
              <div className="text-lg md:text-xl">
                <span className="mr-4 font-semibold dark:text-white">
                  Description:
                </span>
                <span className="text-[#4F4F4F] dark:text-zinc-200 font-semibold">
                  {props.data.description}
                </span>
              </div>
            )}
            <a
              href={props.data.img_download}
              target="_blank"
              rel="noreferrer"
              className="bg-[#33b249] text-white rounded-md px-4 py-2 w-32 text-center"
              download
            >
              Download
            </a>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-[#4F4F4F] dark:text-slate-100 flex justify-center items-center">
              <img
                src={props.data.userImg}
                alt=""
                className="rounded-3xl w-10 md:w-12 mr-4"
              />
              <div className="flex flex-col text-lg items-start justify-center">
                <span className="font-semibold">{props.data.user}</span>
                <span>@{props.data.username}</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img
                src={props.theme === "light" ? likesBlack : likesWhite}
                alt="..."
                className="ml-10 w-8 mr-4 md:ml-0"
              />
              <span className="text-lg font-semibold dark:text-slate-300">
                {props.data.likes} Likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
