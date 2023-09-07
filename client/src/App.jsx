import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo1, logo2 } from "./assets";

import { Home, CreatePost } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full overflow-hidden flex justify-between  items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] ">
        <Link
          to={"/create-post"}
          className=" font-medium text-white px-4 py-2 bg-[#486E52] rounded-md"
        >
          شارك
        </Link>
        <Link to="/" className="ml-auto">
          <div className=" flex items-center gap-3">
            <img
              src={logo2}
              alt="logo"
              className="w-20  block mb- object-contain"
            />
            <img
              src={logo1}
              alt="logo"
              className="w-10 block mb- object-contain"
            />
          </div>
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
