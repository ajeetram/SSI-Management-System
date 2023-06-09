import React, {useState } from "react";
import { connectingWithContract } from "../Utils/apiFeatures";
import "./issuer.css";
import { Loader } from "../Index";
const Issuer = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    idNumber: "",
    candidateName: "",
    collegeName: "",
    courseName: "",
    address: "",
    expiryYear: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  
  const IssueCertificate = async () => {
    try {
      if (
        (!data.idNumber ||
          !data.candidateName ||
          !data.collegeName ||
          !data.courseName ||
          !data.address,
        !parseInt(data.expiryYear, 10))
      )
        return alert("Please fill all the fileds");
      const contract = await connectingWithContract();
      const generateCertificate = await contract.generateCertificate(
        data.idNumber,
        data.candidateName,
        data.collegeName,
        data.courseName,
        data.address,
        parseInt(data.expiryYear, 10)
      );
      setLoading(true);
      await generateCertificate.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      alert("Please fill all the fields");
    }
  };

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
              type="text"
              name="address"
              value={data.address}
              onChange={changeHandler}
              className="field-style field-split align-left"
              placeholder="Candidate Wallet Address"
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
        {loading === true ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="button"
            onClick={() => IssueCertificate()}
          >
            Issue
          </button>
        )}
      </div>
    </div>
  );
};

export default Issuer;
