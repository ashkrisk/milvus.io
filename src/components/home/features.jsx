import React from "react";
import CloudIcon from "../../images/home/cloud.svg";
import CommandIcon from "../../images/home/command.svg";
import SearchIcon from "../../images/home/search.svg";

const HomeBanner = () => {
  return (
    <section className="section2 col-12 col-8 col-4">
      <h2>Fuel your machine learning deployment</h2>
      <h5>
        Store, index, and manage massive embedding vectors generated by deep
        neural networks and other machine learning (ML) models.
      </h5>
      <ul className="features">
        <li>
          <img src={CloudIcon} alt="cloud" />
          <h4>Cloud-native</h4>
          <p>
            Cloud-native architectures help deliver breakthrough efficiency and
            agility.
          </p>
        </li>
        <li>
          <img src={SearchIcon} alt="search" />
          <h4>Vector similarity search</h4>
          <p>
            Vector search paired with attribute filtering to leverage the
            synergy of various data types.
          </p>
        </li>
        <li>
          <img src={CommandIcon} alt="command" />
          <h4>Developer first</h4>
          <p>
            Milvus provides comprehensive multi-language SDKs for your ML
            applications.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default HomeBanner;
