import React from "react";
import { Earth } from "../components/Earth";
import { Canvas } from "@react-three/fiber";
import Footer from "../components/Footer";
import ContactUsForm from "../components/ContactUsForm";
import Navbar from "../components/Navbar";
import { StarsBackground } from "../components/StarsBackground";
import { useSelector } from "react-redux";
import { IoMdArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";

const Home = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />

      <div className="bg-deepblue-800 relative">
        <div className="flex flex-col justify-center items-center p-4">
          <p className=" mt-2 mb-3 text-lg border border-darkgray-300 border-opacity-20  flex bg-darkgray-400 bg-opacity-20 text-darkgray-5 font-medium px-6 py-2 rounded-full">
            Universe of stories - Unleash Your Imagination and Build Stories
          </p>
        </div>

        <div className="h-[450px]">
          <Canvas>
            <StarsBackground count={10000} />
            <Earth />
          </Canvas>
        </div>

        <div className="flex justify-center items-center w-full p-28 ">
          <video
            src="../assets/images/gpt.mp4"
            alt="chatgpt gif"
            className="w-[50%]"
          />
          <div className="text-darkgray-50 p-4 w-[50%]">
            <p className="font-semibold pb-2 text-white text-2xl">
              Create Stories Like Never Before
            </p>
            Discover the magic of storytelling with our AI-driven platform!
            Whether you're a writer seeking inspiration or just someone curious
            about creating stories, this tool brings your ideas to life. Simply
            pick a genre, start with a line, and watch as the AI crafts the
            narrative alongside you. Dive into an experience where creativity
            meets technology, making storytelling intuitive, exciting, and
            entirely your own.
          </div>
        </div>
        <div className="flex justify-center items-center w-full p-24 pt-5">
          <div className="text-darkgray-50 p-4 w-[50%]">
            <p className="font-semibold pb-2 text-white text-2xl">
              Pick Your Favourite Genre!
            </p>
            Experience storytelling reimagined as a thrilling challenge! With
            our platform, you can explore your imagination and turn your
            creative process into a game. Share your creations, surprise
            yourself with every line, and make storytelling more engaging and
            playful than ever. It's more than writing—it's an adventure!
          </div>
          <img
            src="../assets/images/gpt.mp4"
            alt="chatgpt gif"
            className="w-[50%]"
          />
        </div>

        <div className="flex justify-center items-center p-10">
          <ContactUsForm />
        </div>
      </div>

      <div className="h-full w-full bg-deepblue-800 relative p-[130px] pb-[160px]">
        <div className="relative z-10 text-[140px] text-darkgray-400 opacity-20 font-bold ml-34 text-center justify-center flex items-center">
          LET'S BUILD STORIES
        </div>

        <p className="absolute z-20 text-white text-[60px] mt-[-350px] ml-[180px] font-semibold">
          Start with a single line!
        </p>

        <div className="h-[130px] w-[130px] rounded-full text-black font-semibold bg-darkgray-400  relative z-30 mt-[-160px] ml-[460px]">
          <a
            className="text-[23px] w-[80%] absolute mt-6 ml-8 cursor-pointer z-20 "
            href={token == null ? "/signup" : "/genres"}
          >
            {" "}
            Pick a genre
          </a>
          <IoMdArrowRoundForward className="absolute z-30 mt-[94px] ml-[50px] font-bold text-2xl" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
