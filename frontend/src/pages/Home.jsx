import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/features/home/components/Hero'
import AiTools from '@/features/home/components/AiTools'
import Testimonial from '@/features/home/components/Testimonial'
import Plan from '@/features/home/components/Plan'
import Footer from '@/components/layout/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools/>
      <Testimonial />
      <Plan/>
      <Footer/>
    </>
  )
}

export default Home
