import React from "react";
import const_data from "../assets/data";

const About = () => {
  const about = const_data.header.about[1];
  return (
    <div>
      <div>
        <h3>{about.about_me}</h3>
      </div>
      <div>
        <h2>{about.vision}</h2>
      </div>
      <div>
        <p>{about.experiences}</p>
      </div>
    </div>
  );
};

export default About;
