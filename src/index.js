import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UsuarioState from 'context/UsuarioState'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsuarioState>
        <App />
      </UsuarioState>
    </QueryClientProvider>
  </React.StrictMode>
)
