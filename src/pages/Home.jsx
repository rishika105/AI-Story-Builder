import React from "react";
import { Earth } from "../components/Earth";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Footer from "../components/Footer";
import ContactUsForm from "../components/ContactUsForm";

const Home = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className="text-darkgray-5 font-bold text-2xl p-6 text-[2rem]">
          AI STORY BUILDER
        </h1>
        <p className="text-darkgray-50">
          Unleash Your Imagination - Build Stories One Sentence at a Time
        </p>
      </div>

      <Canvas>
        <Earth />
      </Canvas>

      <div className="text-white p-4">
        Welcome to our story generation platform, where creativity meets
        technology! Whether you're a budding writer, an avid storyteller, or
        trying to engage yourself in like a game or just someone looking to
        explore the magic of words, this is the perfect place for you. Our
        AI-powered system helps you craft engaging and imaginative stories,
        sentence by sentence, while keeping the essence of your narrative
        intact. Pick a genre, start with a single idea, and watch your story
        unfold in ways you never imagined. Let’s make storytelling interactive,
        fun, and limitless! Also You can copy the entire story prompt to let
        others read or post somewhere!
      </div>

      <ContactUsForm />

      <Footer />
    </div>
  );
};

export default Home;
