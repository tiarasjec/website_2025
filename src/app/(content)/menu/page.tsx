"use client";
import React from 'react'
import Waves from '@/app/Backgrounds/Waves/Waves';
import InfiniteMenu from '@/app/Components/InfiniteMenu/InfiniteMenu';
import './page.css'

function page() {
    const items = [
        {
          image: '/home.png',
          link: '/',
          title: 'HOME',
          description: ''
        },
        {
          image: '/event.jpg',
          link: '/events',
          title: 'EVENTS',
          description: ''
        },
        {
          image: '/team.jpg',
          link: '/team',
          title: 'TEAM',
          description: ''
        },
        {
          image: '/about.png',
          link: '/about',
          title: 'ABOUT',
          description: ''
        },
        {
            image: '/rules.jpg',
            link: '/rulebook',
            title: 'RULES',
            description: ''
        }
      ];
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', color: 'white', backgroundColor: 'transparent' }}>
        <InfiniteMenu items={items}/>
    </div>
  )
}

export default page
