import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiconnector";
import { contactusEndpoint } from "../services/api";

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const [loading, setLoading] = useState(false);



  const submitContactForm = async (data) => {
    console.log("DATA", data);
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      console.log("logging response ", response);
      toast.success("Message send successfully");
      if (response.data.success) {
        reset({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log("Error", error.message);
      toast.error("Couldn't send your message");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (!isSubmitSuccessful || loading) {
      reset({
        name: "",
        email: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful, loading]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      {
        <div className="border border-darkgray-300 rounded-md p-11 border-opacity-20">
          <h1 className="text-darkgray-5 text-2xl p-3 flex justify-center mb-3">
            Contact Us
          </h1>
          <div className="flex flex-col gap-5 justify-between text-white text-md w-[400px]">
            {/* name */}
            <div>
              <label htmlFor="name" className="ml-1">
                Name
              </label>
              <br></br>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                {...register("name", { required: true })}
                className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full"
              />
            </div>
            {/* email */}
            <div>
              <label htmlFor="email" className="ml-1">
                Email
              </label>
              <br></br>
              <input
                required
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full"
              />
            </div>

            {/* message */}
            <label htmlFor="message" className="ml-1">
              Enter your Message
            </label>
            <textarea
              required
              type="text"
              name="message"
              id="message"
              cols={20}
              rows={5}
              placeholder="Enter your message"
              {...register("message", { required: true })}
              className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 w-full"
            />

            <button
              type="submit"
              className="px-2 py-2 bg-darkgray-50 bg-opacity-80 mt-1 text-black font-semibold rounded-md"
            >
              Send message
            </button>
          </div>
        </div>
      }
    </form>
  );
};

export default ContactUsForm;
