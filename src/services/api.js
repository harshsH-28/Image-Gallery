import axios from "axios";

const getUnsplashImages = async (page) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/?page=${page}&client_id=PWmJ8URqnrfVvKRlhbIK32UUP-ML4qjtDW6mxjCOs7k`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const searchUnsplashImages = async (searchPage, debouncedSearch) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=${searchPage}&query=${debouncedSearch}&client_id=PWmJ8URqnrfVvKRlhbIK32UUP-ML4qjtDW6mxjCOs7k`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getUnsplashImages, searchUnsplashImages };
