"use client";
import { useState, useEffect } from "react";
import { Checkoutproduct } from "./context";

export function CheckoutProductArray({ children }) {
  const [addcart, setaddcart] = useState([]);
  const[checked,setchecked]=useState(false);
    const[Signinid,setSigninid]=useState("");
      const [tokenid, settokenid] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("Signinid",Signinid);

    if (saved) {
      function e() {
        console.log("localstorage id of cart", saved);
        setSigninid(saved);
       }
      e();
    }
  }, []); 

  useEffect(() => {
    if (Signinid) {
      localStorage.setItem("Signinid", Signinid);
    }
  }, [Signinid]); // react runs useeffect ones after 1st render regardless what dependancy array says [] or [cartid] it will still run both at 1st render
                                     
  return (
    <Checkoutproduct.Provider
      value={{ addcart, setaddcart,checked,Signinid,setSigninid,setchecked,settokenid,tokenid}}
    >
      {children}
    </Checkoutproduct.Provider>
  );         
}
