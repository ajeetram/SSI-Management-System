import React, { useState, useEffect } from "react";
import { connectingWithContract } from "../Utils/apiFeatures";
import "./holder.css";
import Img from "../../assets/img1.gif";
const Holder = () => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [expiry, setExpiry] = useState(0);
  const [id, setId] = useState("");
  const getCertificates = async () => {
    try {
      const contract = await connectingWithContract();
      const Data = await contract.getData(id);
      console.log("your Data", Data[0]);
      setName(Data[0]);
      setCollege(Data[1]);
      setCourse(Data[2]);
      setExpiry(Data[3]);
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

      <div className="card">
        <div class="id-card">
          <div class="id-card__header">
            <img src={Img} alt="student-photo"></img>
            <h2 class="id-card__name">{name}</h2>
          </div>
          <div class="id-card__content">
            <p>
              <span>College Name:</span>
              {college}
            </p>
            <p>
              <span>Course Name:</span>
              {course}
            </p>
            <p>
              <span>Expiry Year:</span>
              {expiry.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holder;
