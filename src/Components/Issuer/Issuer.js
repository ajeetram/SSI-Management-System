import React, { useContext, useState } from "react";
import {
  connectingWithContract } from '../Utils/apiFeatures'
import "./issuer.css";
import { SSIAppContexts } from "../Context/SSIContext";
import { Loader } from "../Index";
const Issuer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    idNumber:"",
    candidateName:"",
    collegeName:"",
    courseName:"",
    expiryYear:"",
})

  const changeHandler=(e)=>
  {
    const name = e.target.name;
    const value = e.target.value;
    setData({...data,[name]:value})
  }
  console.log("Named",data.candidateName)
  console.log(parseInt(data.expiryYear,10)+2)

  const IssueCertificate = async()=>
  {
    try {
      
      if(!data.idNumber|| !data.candidateName|| !data.collegeName || !data.courseName || !parseInt(data.expiryYear,10)) return alert("Please fill all the fileds")
        const contract = await connectingWithContract();
        const generateCertificate= await contract.generateCertificate(data.idNumber,data.candidateName,data.collegeName,data.courseName,parseInt(data.expiryYear,10));
        setLoading(true);
       await generateCertificate.wait();
        setLoading(false);
        window.location.reload();
    } catch (error) {
      setError("Please filled all the filled")
      
    }
  }

  return (
    <div>
      <div className="form-style-9">
      <h1>Issue Credentials</h1>
        <ul>
          <li>
            <input
              type="text"
              name="idNumber"
              value={data.idNumber}
              onChange={changeHandler}
              className="field-style field-split align-left"
              placeholder="ID No."
            />
            <input
              type="text"
              name="candidateName"
              value={data.candidateName}
              onChange={changeHandler}
              className="field-style field-split align-right"
              placeholder="Candidate Name"
            />
          </li>
          <li>
            <input
              type="text"
              name="collegeName"
              value={data.collegeName}
              onChange={changeHandler}
              className="field-style field-split align-left"
              placeholder="College Name"
            />
            <input
              type="text"
              name="courseName"
              value={data.courseName}
              onChange={changeHandler}
              className="field-style field-split align-right"
              placeholder="Course Name"
            />
          </li>
          <li>
          <input
              type="number"
              name="issueYear"
              className="field-style field-split align-left"
              placeholder="Issue Year"
            />
          <input
              type="number"
              name="expiryYear"
              value={data.expiryYear}
              onChange={changeHandler}
              className="field-style field-split align-right"
              placeholder="Expiry Year"
            />
          </li>

        </ul>
        {
          loading===true?<Loader />:
        
        <button type="submit" className="button" onClick={()=>IssueCertificate()}>Issue</button>
        }
      </div>
    </div>
  );
};

export default Issuer;
