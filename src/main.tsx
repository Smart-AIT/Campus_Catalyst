import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anton/400.css'
import '@fontsource/special-elite/400.css'
import '@fontsource/permanent-marker/400.css'
import '@fontsource/libre-baskerville/400.css'
import '@fontsource/libre-baskerville/400-italic.css'
import '@fontsource/libre-baskerville/700.css'
import '@fontsource-variable/dm-sans/index.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import App from './App'
import { FxProvider } from './utils/fx'
import { installNoise } from './utils/noise'

installNoise()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FxProvider>
      <App />
    </FxProvider>
  </StrictMode>,
)
