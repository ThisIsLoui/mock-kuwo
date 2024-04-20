import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import 'modern-normalize/modern-normalize.css'
import './assets/base.scss'
import MyModal from './components/MyModal'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<>加载中</>}>
        <RouterProvider router={router} fallbackElement={<>加载中</>} />
        <MyModal />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
