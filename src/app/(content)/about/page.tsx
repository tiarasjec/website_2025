"use client";
import React from 'react'
import ShaderVisualization from '@/app/components/Background';
import { cn } from '@/lib/utils';
import { tiaraFont } from '@/lib/fonts';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

function page() {
  const text = `St Joseph Engineering College has come together to host a national
      level techno-cultural fest, Tiara 2024. Tiara is a National-level
      Techno-Cultural fest, conducted for young minds aspiring to be
      extraordinary, that is open to all students of undergraduate level and
      above to come and showcase their talents and represent their
      respective institutions on the grand stage of Tiara. Our event mainly
      aims to spread and teach the youth to explore new areas of Technology
      and Culture to foster the nation's development. SJEC welcomes you
      all to Tiara-2024 To unleash your potential and unlock your skills.
      See you on 9th, 10th and 11th May 2024`
  return (
    <div>
      <ShaderVisualization />
      <h1 className={cn("text-center text-8xl text-white", tiaraFont.className)}>About Tiara</h1>
      <TextGenerateEffect words={text} className='ml-12 mt-10' />
    </div>
  )
}

export default page

