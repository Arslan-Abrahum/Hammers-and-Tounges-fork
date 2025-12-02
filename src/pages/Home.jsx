import React from 'react'
import Hero from '../components/Hero'
import BrowseByCategory from '../components/BrowseByCategory'
import FeaturedAuctions from '../components/FeaturedAuctions'
import Onboarding from '../components/Onboarding'

const Home = () => {
  return (
    <>
      <Hero />
      <BrowseByCategory />
      <FeaturedAuctions />
      <Onboarding />
    </>
  )
}

export default Home



