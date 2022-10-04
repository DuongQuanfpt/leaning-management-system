import React from 'react'

import Header from '~/components/Homepage/Header'
import MainSlider from '~/components/Homepage/MainSlider'
import ServiceContent from '~/components/Homepage/ServiceContent'
import PopularCoursesSlider from '~/components/Homepage/PopularCoursesSlider'
import OnlineCoursesCount from '~/components/Homepage/OnlineCoursesCount'
import UpcomingEventSlider from '~/components/Homepage/UpcommingEventSlider'
import PeopleFeedbackSlider from '~/components/Homepage/PeopleFeedbackSlider'
import ContactUs from '~/components/Homepage/ContactUs'
import Footer from '~/components/Homepage/Footer'

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <MainSlider />
        <div className="content-block" id="content-area">
          <ServiceContent />
          <PopularCoursesSlider />
          <OnlineCoursesCount />
          <UpcomingEventSlider />
          <PeopleFeedbackSlider />
          <ContactUs />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
