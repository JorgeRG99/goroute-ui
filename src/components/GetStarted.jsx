import React from "react";
import SportImage from "../assets/sport.webp";

export const GetStarted = () => {
  return (
    <section className="w-full flex">
      <img className="w-[49%]" src={SportImage} alt="" />
      <div className="w-[50%] h-[40vh] bg-black"></div>
    </section>
  );
};
