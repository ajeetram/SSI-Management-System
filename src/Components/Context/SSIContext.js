import React,{createContext, useState, useEffect} from 'react'

import { checkIfWalletIsConnected,
    connectWallet,
    connectingWithContract } from '../Utils/apiFeatures'

 export const SSIAppContexts = createContext();

 export const SSIAppProvider = ({children}) => {
  // Use State
const [account, setAccount] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

// Fetch Data At the time page load

const fetchData = async()=>
{
  try {
    const connectAccount = await connectWallet();
    setAccount(connectAccount);
    console.log("Account: ",connectAccount)
    
  } catch (error) { 
    // setError("Please install MetaMask And connect account");
    
  }
}


  const IssueCertificate = async({idNumber,candidateName,orgName,courseName,expiryYear})=>
  {
    try {
      //if(id||candidateName||orgName||courseName||expiryYear)
      
        console.log("id",idNumber);
        const contract = await connectingWithContract();
        const generateCertificate= await contract.generateCertificate(idNumber,candidateName,orgName,courseName,expiryYear);
        setLoading(true);
       await generateCertificate.wait();
        setLoading(false);
        window.location.reload();
      
      
      
    } catch (error) {
      setError("Please filled all the filled")
      
    }
  }
  useEffect(()=>{
    checkIfWalletIsConnected();
    fetchData();
  },[]);

  // Create Account

  // const getCertificates = async({id})=>
  // {
  //   try {
  //     const contract  = await connectingWithContract();
  //     const data = await contract.getData(id);
  //     setLoading(true);
  //     await data.wait();
  //     setLoading(false);
  //     window.location.reload();
      
  //   } catch (error) {
  //     setError("This Id is not register")
      
  //   }
  // }

  
  return (
    <SSIAppContexts.Provider 
    value = {{
      IssueCertificate,
      //getCertificates, 
      connectWallet,
      checkIfWalletIsConnected,
      account,
      loading,
      error,
       }}>
       
         {children}
    </SSIAppContexts.Provider>
  );
};

 