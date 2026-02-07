import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReceipeProvider } from './Context/receipeContext.jsx'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReceipeProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </ReceipeProvider>
  </StrictMode>,
)
