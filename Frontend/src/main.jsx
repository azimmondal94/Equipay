import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-vk484f7n5u0zbw2k.us.auth0.com"
     clientId="2o6PljzYyyya7oQKcvvr5m8yKzFqcXnj"
    // clientId="rLr6BoFv8Q8GxWzpC1VftnA6VFJIz8bC"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode >,
)


