import React, { useState } from 'react'
import './verifier.css'
import Img from "../../assets/img1.gif";
import { connectingWithContract } from "../Utils/apiFeatures";
const Verifier = () => {
  const [verify, setVerify] = useState(false)
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [expiry, setExpiry] = useState("");
  const [id, setId] = useState("");
  const [add, setAdd] = useState("");

  const getCertificates = async () => {
    try {
      const contract = await connectingWithContract();
      const Data = await contract.getData(id);
      console.log("your Data", Data[4].toNumber());
      setName(Data[0]);
      setCollege(Data[1]);
      setCourse(Data[2]);
      setAdd(Data[3]);
      setExpiry(Data[4].toNumber());
      setVerify(true)
    } catch (error) {
      alert("You don't  have access of this ID credential !");
      //window.location.reload();
    }
  };

  const verifier=()=>
  {
    if(!verify)
    {
      setVerify(true)
    }
   
    return alert("Credentilas Verified !")
    
    
  }
  return (
    <div class="id-card-wrapper">
        <div class="id-card">
          <div class="profile-row">
            <div class="dp">
              <div class="dp-arc-outer"></div>
              <div class="dp-arc-inner"></div>
              <img src={Img} alt="profile" />
            </div>
            <div class="desc">
              <h1>{name}</h1>
              <p><span>College Name:</span> <span className='att'>{college}</span></p>
              <p><span>Course Name:</span> <span className='att'>{course}</span></p>
              <p><span>Wallet Address:</span> <span className='att'>{add.slice(0, 10)}...</span></p>
              <p><span>Graduation Year:</span> <span className='att'>{expiry}</span></p>
            </div>
          </div>
          <div className='verifyBox'>
            {
              verify?<button className="verifyBtn" onClick={()=>verifier()}>Verify</button>:
              <>
              <div>
              <input typle="text" placeholder='Enter Id Number' className='idInput' onChange={(e) => setId(e.target.value)}></input></div>
              <button className="getDataBtn" onClick={()=>getCertificates()}>Get Data</button>
              
              </>

            }
            </div>
            <div/>
            </div>
            </div>
  )
}

export default Verifier;