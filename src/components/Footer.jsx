import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-darkblue-300 w-full h-[360px] text-darkgray-100">
      <div className="flex gap-4 p-10 relative justify-around">
        <div className="flex flex-col gap-2">
          <p className="text-darkgray-25 font-semibold">Quick Links</p>
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/"> Contact Us</a>
          <a href="/">Play Now</a>
          <a href="/">FAQs</a>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-darkgray-25 font-semibold">Social Media</p>
          <div className="flex gap-2">
            <a href="/" className="flex">
              Facebook{" "}
            </a>
          </div>
          <a href="/">Instagram</a>
          <a href="/">Twitter</a>
          <a href="/">Linked In</a>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-darkgray-25 font-semibold">Policies</p>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/"> Cookie Policy</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-darkgray-25 font-semibold">Credits</p>
            <a href="/">Powered by Gemini 1.5 Flash</a>
            <a href="/">Built using MERN Stack</a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-darkgray-25 font-semibold">Contact Info</p>
          <a href="/">Email:support@storybuilder.com</a>
          <a href="/">Phone: 755755855X</a>
          <a href="/">
            Address: 123 Creativity Lane
            <br />
          </a>
          <div className="flex gap-2 mt-2">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
      </div>

      <div className="w-[90%] h-[0.5px] bg-darkgray-100 opacity-20 justify-center items-center text-center mx-auto flex"></div>

      <div className="flex justify-between p-4 text-sm">
        <div className="pl-10">
          © 2024 AI Story Builder. All rights reserved
        </div>

        <div className="pr-10"> Made with ❤️ Rishika</div>
      </div>
    </div>
  );
};

export default Footer;
