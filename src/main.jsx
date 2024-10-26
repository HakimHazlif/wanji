import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import AppProvider from './Context/AppProvider'
import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProvider>
        <App /> 
      </AppProvider>
    </Provider>
  </BrowserRouter>,
)
