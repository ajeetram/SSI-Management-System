import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { Route,Routes } from 'react-router-dom';
import { Verifier,Holder,Issuer,Home } from './Components/Index';
function App() {
  return (
    <>
    <NavBar></NavBar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/issuer" element={<Issuer />} />
      <Route path="/holder" element={<Holder />} />
      <Route path="/verifier" element={<Verifier />} />
      </Routes>
    </>
    
      
    
  );
}

export default App;
