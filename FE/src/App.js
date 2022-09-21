import { Routes, Route, useNavigate } from 'react-router-dom'
import { Fragment, Suspense, useEffect } from 'react'

import { privateRoutes, publicRoutes } from '~/routes'
import ScrollToTop from '~/components/ScrollToTop'
import Loading from '~/pages/common/Loading'

// Plugins Stylesheet
import 'bootstrap/dist/css/bootstrap.min.css'

// Slick Carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// StyleSheet
import '~/assets/css/typography.css'
import '~/assets/css/shortcodes/shortcodes.css'
import '~/assets/css/style.css'
import '~/assets/css/dashboard.css'
import '~/assets/css/color/color-1.css'

// Fonts
import '~/assets/vendors/fontawesome/css/font-awesome.min.css'
import '~/assets/vendors/flaticon/flaticon.css'
import '~/assets/vendors/line-awesome/css/line-awesome.min.css'
import '~/assets/vendors/themify/themify-icons.css'

function App() {
  // const navigateTo = useNavigate()

  // useEffect(() => {
  //   if (!localStorage.getItem('LMS-User-Token')) {
  //     navigateTo('/')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}

            {privateRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Routes>
        </div>
        <ScrollToTop />
      </Suspense>
    </Fragment>
  )
}

export default App
