import React from 'react'
import { useEffect, useState } from 'react';
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';


const ContactUsForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState : {errors, isSubmitSuccessful}
  } = useForm();
  return (
   <form>
  <div className='border border-darkgray-300 rounded-md p-11 border-opacity-20'>
    <h1 className='text-darkgray-5 text-2xl p-3 flex justify-center mb-3'>Contact Us</h1>
  <div className='flex flex-col gap-5 justify-between text-white text-md w-[400px]'>
      {/* name */}
      <div>
        <label htmlFor='name' className='ml-1'>Name</label><br></br>
        <input type='text'
        name="name"
        id="name"
        placeholder='Enter your full name'
        {...register("name", {required: true})}
        className='text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full'
        />
        {
          errors.name && (
            <span className='text-red-400 text-sm'>
              *Please enter your name
            </span>
          )
        }
      </div>
     {/* email */}
      <div>
      <label htmlFor='email' className='ml-1'>Email</label><br></br>
        <input type='text'
        name="email"
        id="email"
        placeholder='Enter your email'
        {...register("email", {required: true})}
                className='text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full'
        />
        {
          errors.email && (
            <span className='text-red-400 text-sm'>
              *Please enter your email
            </span>
          )
        }
      </div>

      {/* message */}
      <label htmlFor='message' className='ml-1'>Enter your Message</label>
        <textarea type='text'
        name="message"
        id="message"
        cols={20}
        rows={5}
        placeholder='Enter your message'
        {...register("message", {required: true})}
                className='text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 w-full'
        />
        {
          errors.message && (
            <span className='text-red-400 text-sm'>
              *Please enter your message
            </span>
          )
        }

        <button type='submit' className='px-2 py-2 bg-darkgray-50 bg-opacity-80 mt-1 text-black font-semibold rounded-md'>
          Send message
        </button>

    </div>
  </div>
   </form>
  )
}

export default ContactUsForm
