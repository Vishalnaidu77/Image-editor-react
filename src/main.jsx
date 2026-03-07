import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FilterContext from './Context/FilterContext.jsx'

createRoot(document.getElementById('root')).render(
   <FilterContext>
       <App />
   </FilterContext> 
)
