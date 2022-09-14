import { Routes, Route } from 'react-router-dom'
import { Fragment, Suspense } from 'react'

import { privateRoutes, publicRoutes } from '~/routes'
import ScrollToTop from '~/components/ScrollToTop'
import Loading from '~/pages/common/Loading'

// Plugins Stylesheet
import 'bootstrap/dist/css/bootstrap.min.css'

// Slick Carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// React Modal Video
import 'react-modal-video/css/modal-video.min.css'

// StyleSheet
import '~/assets/css/typography.css'
import '~/assets/css/shortcodes/shortcodes.css'
import '~/assets/css/style.css'
import '~/assets/css/color/color-1.css'

// Fonts
import '~/assets/vendors/fontawesome/css/font-awesome.min.css'
import '~/assets/vendors/flaticon/flaticon.css'
import '~/assets/vendors/line-awesome/css/line-awesome.min.css'
import '~/assets/vendors/themify/themify-icons.css'

function App() {
  const isAuthenticated = () => {
    return true
  }

  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}

            {isAuthenticated &&
              privateRoutes.map((route, index) => {
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
