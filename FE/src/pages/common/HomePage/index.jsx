import React from 'react'

import Footer from '~/components/Footer'
import Header from '~/components/Header'
import MainSlider from '~/components/MainSlider'
import PopularCoursesSlider from '~/components/PopularCoursesSlider'
import ServiceContent from '~/components/ServiceContent'

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <MainSlider />
        <div className="content-block" id="content-area">
          <ServiceContent />
          <PopularCoursesSlider />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
