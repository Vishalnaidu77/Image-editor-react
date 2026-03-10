import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FilterContext from './Context/FilterContext.jsx'
import ResetFilterContext from './Context/ResetFilterContext.jsx'

createRoot(document.getElementById('root')).render(
   <FilterContext>
        <ResetFilterContext>
            <App />
        </ResetFilterContext>
   </FilterContext> 
)
