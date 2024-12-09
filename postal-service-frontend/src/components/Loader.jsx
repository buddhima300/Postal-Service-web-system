import React from "react";
import "../components/loader.css";

function Loader() {
  return (
    <div class="wrapper">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <span>Loading....</span>
    </div>
  );
}

export default Loader;
