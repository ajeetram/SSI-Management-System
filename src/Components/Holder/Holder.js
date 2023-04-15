import React, { useContext, useState } from "react";
import {connectingWithContract } from "../Utils/apiFeatures";
import { SSIAppContexts } from "../Context/SSIContext";
import "./holder.css";
import Img from "../../assets/img1.gif";
import { AccountList, Loader } from "../Index";
const Holder = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [expiry, setExpiry] = useState("");
  const [id, setId] = useState("");
  const [add, setAdd] = useState("");
  const [to, setTo] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const {account} = useContext(SSIAppContexts)

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
    } catch (error) {
      alert("This Id is not register");
    }
  };

  const shareCred = async () => {
    try {
      
      const contract = await connectingWithContract();
      const share=await contract.allow(to);
      setLoading(true);
      await share.wait();
      setLoading(false);
      window.location.reload();
      alert("Access provided");
    } catch (error) {
      alert("This Id is not register");
    }
  };
  const unShareCred = async () => {
    try {
      console.log("Hello");
      const contract = await connectingWithContract();
      const unshare =  await contract?.disAllow(to);
      setLoading(true);
      await unshare.wait();
      setLoading(false);
      window.location.reload();
      alert("Access revoked",);
    } catch (error) {
      alert("This Id is not register");
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
              <img src={Img} alt="profile" />
            </div>
            <div class="desc">
              <h1>{name}</h1>
              <p>College: {college}</p>
              <p>Course: {course}</p>
              <p>Address: {add.slice(0, 10)}...</p>
              <p>Expiry Year: {expiry}</p>
            </div>
            <div className="allowBtn">
              <button onClick={() => setShow1(true)}>Share</button>
              {show1 ? (
                <>
                  <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                      <button
                        className="close-modal"
                        onClick={() => setShow1(false)}
                      >
                        CLOSE
                      </button>
                      <div className="addBox">
                        <div className="addinpput">
                          <input
                            type="text"
                            placeholder="Enter Address"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                          ></input>
                        </div>
                        <div>
                        {
                          loading===true?<Loader />:
                          <button
                            className="shareBtn"
                            onClick={() => shareCred()}
                          >
                            Share Access
                          </button>
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              <button onClick={() => setShow2(true)}>Revoke</button>
              {show2 ? (
                <>
                  <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                      <button
                        className="close-modal"
                        onClick={() => setShow2(false)}
                      >
                        CLOSE
                      </button>
                      <div className="addBox">
                        <div className="addinpput">
                          <input
                            type="text"
                            placeholder="Enter Address"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                          ></input>
                        </div>
                        <div>
                        {
                          loading===true?<Loader />:
                          <button
                            className="shareBtn"
                            onClick={() => unShareCred()}
                          >
                            Revoke Access
                          </button>
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* <AccountList /> */}
    </div>
  );
};

export default Holder;
