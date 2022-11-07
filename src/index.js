import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import UsuarioState from 'context/UsuarioState'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const root = ReactDOM.createRoot(document.getElementById('root'))

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsuarioState>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </UsuarioState>
    </QueryClientProvider>
  </React.StrictMode>
)

reportWebVitals()
