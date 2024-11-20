import './App.css'
import {BrowserRouter,Routes,Route  } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/LayoutPage/Layout";
import NoPage from "./components/NoPage/NoPage";
function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="layout" element={<Layout />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    
   </BrowserRouter>
   </>
  )
}

export default App
