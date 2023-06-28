import React from "react";
import HomeCarousel from "./HeaderCarousel/HomeCarousel";



export default function Header({ setErrorServer }) {
  return (
    <>
      <div className="carousel">
        <HomeCarousel setErrorServer={setErrorServer} />
      </div>
    </>
  );
}
