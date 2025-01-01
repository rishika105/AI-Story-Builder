import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../services/operations/aiAPI";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setGenre } from "../slices/genreSlice";
import { useNavigate } from "react-router-dom";

const Genres = () => {
  const { token } = useSelector((state) => state.auth);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSelectGenre(genre) {
    // console.log("IN SELECT GENRE");
    dispatch(setGenre(genre)); //dispatch action store in store
    console.log(genre);
    navigate("/story-chatbot");
  }

  const getGenre = async () => {
    try {
      const res = await getGenres(token);
      setGenres(res);
      console.log(res);
    } catch (error) {
      console.log("Could not fetch genres");
    }
  };

  useEffect(() => {
    getGenre();
  }, []); //first render

  return (
    <>
      <Navbar />
      <div className="relative bg-deepblue-800 pt-3 p-7 pb-24">
        <h1 className="flex items-center mt-8 text-white font-semibold text-2xl justify-center">
          PICK A GENRE
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 mt-2 ">
          {genres.map((genre, index) => (
            <button
              key={index}
              onClick={() => handleSelectGenre(genre)}
              className="p-6 rounded-md shadow-lg h-[150px]
              
                transition-colors duration-200 cursor-pointer bg-darkgray-400 bg-opacity-20 border border-darkgray-300 border-opacity-20"
            >
              <h2 className="text-white text-xl font-medium">{genre}</h2>
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Genres;