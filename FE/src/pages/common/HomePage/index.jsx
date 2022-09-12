import React from 'react'

import Footer from '~/components/Footer'
import Header from '~/components/Header'
import MainSlider from '~/components/MainSlider'
import ServiceContent from '~/components/ServiceContent'
import PopularCoursesSlider from '~/components/PopularCoursesSlider'
import OnlineCoursesCount from '~/components/OnlineCoursesCount'
import UpcomingEventSlider from '~/components/UpcommingEventSlider'
import PeopleFeedbackSlider from '~/components/PeopleFeedbackSlider'
import RecentNewsSlider from '~/components/RecentNewsSliders'

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
          <RecentNewsSlider />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
