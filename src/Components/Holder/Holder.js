import React, { useState, useEffect } from "react";
import { connectingWithContract } from "../Utils/apiFeatures";
import "./holder.css";
import Img from "../../assets/img1.gif";
const Holder = () => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [expiry, setExpiry] = useState("");
  const [id, setId] = useState("");
  const[add, setAdd] = useState("");
  const getCertificates = async () => {
    try {
      const contract = await connectingWithContract();
      const Data = await contract.getData(id);
      console.log("your Data", Data[4].toNumber());
      setName(Data[0]);
      setCollege(Data[1]);
      setCourse(Data[2]);
      setAdd(Data[3])
      setExpiry(Data[4].toNumber())

    } catch (error) {
      alert("This Id is not register");
      window.location.reload();
    }
  };

  return (
    <div>
      <div class="grid-container-element">
        <div class="grid-child-element purple">
          <input
            type="text"
            name="idNumber"
            onChange={(e) => setId(e.target.value)}
            className="idInput"
            placeholder="Enter Your Id Number"
          />
        </div>
        <div class="grid-child-element green">
          <button
            type="submit"
            className="getButton"
            onClick={() => getCertificates()}
          >
            Get Your Credentials
          </button>
        </div>
      </div>

      <div class="id-card-wrapper">
  <div class="id-card">
    <div class="profile-row">
      <div class="dp">
        <div class="dp-arc-outer"></div>
        <div class="dp-arc-inner"></div>
        <img src={Img} alt="profile"/>
      </div>
      <div class="desc">
        <h1>{name}</h1>
            <p>College: {college}</p>
            <p>Course: {course}</p>
            <p>Address: {add.slice(0,10)}...</p>
            <p>Expiry Year: {expiry}</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Holder;
