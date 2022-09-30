import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import App from '~/App'
import store, { persistor } from '~/redux/store'
import Loading from './pages/common/Loading'
import reportWebVitals from './reportWebVitals'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory({ window })

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </PersistGate>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
