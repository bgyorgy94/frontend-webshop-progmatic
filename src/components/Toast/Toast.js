import { forwardRef, useState } from "react";
import "./Toast.css";
import { useContext } from "react";
import { ToastContext } from "../../services/toastContext";

export default function Toast(){
    
    const {showToast,setShowToast} = useContext(ToastContext);

      if(showToast.show){
          setTimeout(()=>{
              setShowToast({
                 show:false
              })
         },2000)
      }
    return(
        <div 
        className={showToast.type == "success" ? "toast success" : "toast error"}
        id={showToast.show ? "show" : "hide"}>
            <div className="symbol">
                {showToast.type =="success" ? <span>&#x2713;</span> : <span>&#x2613;</span> }
            </div>
            <div className="message">{showToast.message}</div>

        </div>
    )
}