import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styling from "./PersonInfo.module.scss";
import SvgContainer from "../SvgContainer/SvgContainer";
import ButtonTable from "../ButtonTable/ButtonTable";
import spinner from "../../assets/spinner.svg";

const PersonInfo = () => {
  const [fetchPerson, setFetchPerson] = useState({}); // {} ve [] true
  const [text1, setText1] = useState("My name is");
  const [text2, setText2] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(fetchPerson)

  const ApiFetcher = async () => {
    try {
      setLoading(true);
      await fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((data) => setFetchPerson(data?.results[0]));
      // setText2(`${fetchPerson?.name?.title} ${fetchPerson?.name?.first} ${fetchPerson?.name?.last}`)
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    ApiFetcher();
  }, []);

  return (
    <div className={styling.card}>
      <nav className={styling.navbar}></nav>
      <div className={styling.container}>
        {loading ? (
          <img src={spinner} className={styling.spinner} alt="spinner-gif" />
        ) : (
          <>
            <img src={fetchPerson?.picture?.large} alt="passport" className={styling.image} />
            <div className={styling.text1}>{text1}</div>
            <div className={styling.text2}>{text2 || `${fetchPerson?.name?.title} ${fetchPerson?.name?.first} ${fetchPerson?.name?.last}`}</div>
          </>
        )}
      </div>
      <SvgContainer fetchPerson={fetchPerson} setText1={setText1} setText2={setText2} />
      <ButtonTable ApiFetcher={ApiFetcher} fetchPerson={fetchPerson} />
    </div>
  );
};

export default PersonInfo;
