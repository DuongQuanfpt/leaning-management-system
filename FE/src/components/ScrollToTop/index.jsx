import React, { useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'

const ScrollToTop = () => {
  const [scroll, setScroll] = useState({
    offset: window.scrollY || 1000,
    show: false,
  })

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > scroll.offset) {
        setScroll({
          ...scroll,
          show: true,
        })
      } else {
        setScroll({
          ...scroll,
          show: false,
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScrollToTop = () => {
    animateScroll.scrollToTop()
  }

  return (
    <>
      {scroll.show && (
        <button className="back-to-top" type="button" onClick={handleScrollToTop}>
          <i className="fa fa-chevron-up"></i>
        </button>
      )}
    </>
  )
}

export default ScrollToTop
