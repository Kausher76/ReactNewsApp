import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Todos from "./Component/ToDos";
import "bootstrap/dist/css/bootstrap.min.css";
import News from "./Component/News";
import NavBar from "./Component/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/* <Todos/> */}
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<News category="politics" />}  />
          <Route path="/sports" element={<News category="sports" />}  />
          <Route path="/technology" element={<News category="technology" />}  />
          <Route path="/business" element={<News category="business" />}  />
          <Route path="/health" element={<News category="health" />}  />
        </Routes>
      </BrowserRouter>
      
      
    </>
  );
}

export default App;
