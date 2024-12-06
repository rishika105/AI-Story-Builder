import React from "react";
import { Earth } from "../components/Earth";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Footer from "../components/Footer";
import ContactUsForm from "../components/ContactUsForm";
import Navbar from "../components/Navbar";
import { StarsBackground } from "../components/StarsBackground";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="bg-deepblue-800">
        <div className="flex flex-col justify-center items-center p-4">
          <p className=" mt-2 mb-3 text-lg border border-darkgray-300 border-opacity-20  flex bg-darkgray-400 bg-opacity-20 text-darkgray-5 font-medium px-6 py-2 rounded-full">
            Universe of stories - Unleash Your Imagination and Build Stories
          </p>
        </div>

        <div className="h-[450px]">
          <Canvas>
            <StarsBackground />
            <Earth />
          </Canvas>
        </div>
        <div className="text-white p-4">
          Welcome to our story generation platform, where creativity meets
          technology! Whether you're a budding writer, an avid storyteller, or
          trying to engage yourself in like a game or just someone looking to
          explore the magic of words, this is the perfect place for you. Our
          AI-powered system helps you craft engaging and imaginative stories,
          sentence by sentence, while keeping the essence of your narrative
          intact. Pick a genre, start with a single idea, and watch your story
          unfold in ways you never imagined. Let’s make storytelling
          interactive, fun, and limitless! Also You can copy the entire story
          prompt to let others read or post somewhere!
        </div>

        <ContactUsForm />
      </div>

      <Footer />
    </>
  );
};

export default Home;
