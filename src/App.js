import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Header from "./components/Header/Header";
import "./App.scss"
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
      <BrowserRouter>
          <ScrollToTop />
          <Header/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/movie/:imdbID" element={<MovieDetail/>} />
              <Route element={<PageNotFound/>} />
            </Routes>
          </div>
          <Footer />
      </BrowserRouter>
  );
}

export default App;
