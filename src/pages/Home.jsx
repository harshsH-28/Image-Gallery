import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import Navbar from "../components/Navbar.jsx";
import ImageCard from "../components/ImageCard.jsx";
import Modal from "../components/Modal.jsx";
import homeImg from "../assets/david-marcu-78A265wPiO4-unsplash.jpg";
import { unsplash_Api, getUnsplashImages } from "../services/api";

function Home() {
  const [theme, setTheme] = useState("light");
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalData, setModalData] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchPagelimit, setSearchPagelimit] = useState(1);
  const debouncedSearch = useDebounce(searchInput, 500);
  const [random, setRandom] = useState(0);

  // Get Images Functionality
  const getImages = async () => {
    const getresponse = await getUnsplashImages(page);
    const data = getresponse.data;
    const filteredData = data.map((item) => {
      return {
        imgId: item.id,
        user: item.user.name,
        username: item.user.username,
        userImg: item.user.profile_image.small,
        description: item.alt_description,
        img_thumb: item.urls.small,
        img: item.urls.regular,
        likes: item.likes,
        img_download: item.links.download,
      };
    });
    if (debouncedSearch === "" && page === 1) {
      setResponse(filteredData);
    } else if (page > 1) {
      const newData = [...response, ...filteredData];
      setResponse(newData);
    }
  };

  useEffect(() => {
    getImages();
  }, [page]);

  // Debounce Search Functionality
  const currentSearchValue = (searchInputValue) => {
    setSearchInput(searchInputValue);
  };

  const search = async () => {
    setLoading(true);
    const fetchedData = await unsplash_Api(searchPage, debouncedSearch);
    setSearchPagelimit(fetchedData.data.total_pages);
    const filteredData = fetchedData.data.results.map((item) => {
      return {
        imgId: item.id,
        user: item.user.name,
        username: item.user.username,
        userImg: item.user.profile_image.small,
        description: item.alt_description,
        img_thumb: item.urls.small,
        img: item.urls.regular,
        likes: item.likes,
        img_download: item.links.download,
      };
    });
    if (searchPage === 1) {
      setResponse(filteredData);
    } else {
      const newData = [...response, ...filteredData];
      setResponse(newData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (debouncedSearch !== "") {
      search();
    } else {
      if (searchPage > 1) setSearchPage(1);
      if (page > 1) setPage(1);
      else getImages();
    }
  }, [debouncedSearch, searchPage]);

  // Modal Functionality
  useEffect(() => {
    if (modalId) {
      getModalData();
    }
  }, [modalId]);

  const getModalData = () => {
    if (showModal) {
      const fetchedData = response.find((item) => item.imgId === modalId);
      setModalData(fetchedData);
    }
  };

  const handleClick = (currrentImageId) => {
    setModalId(currrentImageId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Page End Scroll Functionality
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (debouncedSearch === "") {
        setPage(page + 1);
      } else {
        if (searchPagelimit > searchPage) {
          setSearchPage(searchPage + 1);
        }
      }
      console.log(page);
    }
  };

  // Theme Switch Functionality

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <div className="flex flex-col bg-white dark:bg-[#232323]">
      <Navbar search={currentSearchValue} themeSwitch={handleThemeSwitch} />
      <div className="relative flex justify-center items-center">
        <img
          src={homeImg}
          alt="..."
          className="object-cover object-center opacity-95 w-full h-[50vh]"
        />
        <div className="absolute flex flex-col items-center text-white text-xl text-center md:text-3xl font-extrabold tracking-wide">
          <div className="block w-[15em] mb-8 md:hidden">
            <input
              type="text"
              className="w-full h-[2.8em] text-base p-4 outline-none font-normal placeholder:text-gray-500 dark:placeholder:text-white rounded-lg shadow-xl text-black dark:bg-[#858484]"
              value={searchInput}
              placeholder="Search for images here..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <span className="mb-2 md:mb-4">
            Download High Quality Images by creators
          </span>
          <span>Over 2.4 million+ stock Images by our talented community</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center mx-10 md:mx-40 mt-1 mb-10 md:mb-20">
        {showModal && (
          <Modal closeModal={closeModal} data={modalData} theme={theme} />
        )}
        {response.length > 0 &&
          response.map((item, index) => {
            return (
              <ImageCard
                key={index}
                imgId={item.imgId}
                onOnModal={handleClick}
                name={item.user}
                username={item.username}
                userImg={item.userImg}
                img_thumb={item.img_thumb}
                likes={item.likes}
                theme={theme}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Home;
