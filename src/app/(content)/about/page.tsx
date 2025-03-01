"use client";
import React from 'react';
import { SparklesCore } from "../../../components/ui/sparkles";
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

function page() {
  const words = `St Joseph Engineering College has come together to host a national
        level techno-cultural fest, Tiara 2024. Tiara is a National-level
        Techno-Cultural fest, conducted for young minds aspiring to be
        extraordinary, that is open to all students of undergraduate level and
        above to come and showcase their talents and represent their
        respective institutions on the grand stage of Tiara. Our event mainly
        aims to spread and teach the youth to explore new areas of Technology
        and Culture to foster the nation's development. SJEC welcomes you
        all to Tiara-2024 To unleash your potential and unlock your skills.
        See you on 9th, 10th and 11th May 2024.`;
  return (
    <div>
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl mt-28 lg:text-9xl font-bold text-center text-white z-20">
        About TIARA!
      </h1>
      <div className="w-[40rem] h-40 absolute top-10">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-400 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-800 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-800 to-transparent h-px w-1/4" />
 
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    <TextGenerateEffect words={words} className='ml-12 mt-10' />
    <iframe
    className="px-10 mb-10"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9520361386985!2d74.89609701022555!3d12.910804316156533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sin!4v1713257369845!5m2!1sen!2sin"
    width="80%"
    height="450"
    loading="lazy"
    ></iframe>
    </div>
    </div>
  )
}

export default page
