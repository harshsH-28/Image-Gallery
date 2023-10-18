import Axios from "axios";

const getUnsplashImages = async (page) => {
  const getresponse = await Axios.get(
    `https://api.unsplash.com/photos/?page=${page}&client_id=PWmJ8URqnrfVvKRlhbIK32UUP-ML4qjtDW6mxjCOs7k`
  );
  return getresponse;
};

const unsplash_Api = async (searchPage, debouncedSearch) => {
  const fetchedData = await Axios.get(
    `https://api.unsplash.com/search/photos?page=${searchPage}&query=${debouncedSearch}&client_id=PWmJ8URqnrfVvKRlhbIK32UUP-ML4qjtDW6mxjCOs7k`
  );
  return fetchedData;
};

export { getUnsplashImages, unsplash_Api };
