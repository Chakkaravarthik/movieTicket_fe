

import { useState} from "react";
import { MoonLoader} from "react-spinners";


function Spinner() {
  let [loading, setLoading] = useState(true);


  const loadspinner=()=>{
    setLoading(true);
  }

  const stopspinner=()=>{
    setLoading(false);
  }


  return (
    <div className="sweet-loading d-flex align-items-center justify-content-center" style={{width:'100vw', height:'100vh',backgroundColor:'black',zIndex: '1000'}}>

      <MoonLoader
        color="#f30505"
        loading={loading}
        
      />
    </div>
  );
}

export default { Spinner, loadspinner, stopspinner};