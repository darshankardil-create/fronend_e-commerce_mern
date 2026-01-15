"use client";
import React from "react";
import { useState,useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./../components/header"
import {Checkoutproduct} from "./../context/context"



const Page = () => {
  const [postingid, setpostingid] = useState();
  const [pass, setpass] = useState();
  const [form, setform] = useState("");



const{checked}=useContext(Checkoutproduct)
  const{setSigninid}=useContext(Checkoutproduct)

 

  async function postemaildata(e) {
    e.preventDefault();
    const cartid = {
      Email: form,
      password: pass,
    };

    if (true) {
      try {
        const postemail = await axios.post(
          "https://backend-e-commerce-4-01hl.onrender.com/server/register",
          cartid
        );

        console.log("registeremail", postemail);

        if (postemail.status === 201) {
          toast.success("Successfully register now you can login");
          setSigninid(postemail.data.token)
          console.log(postemail)
        //   setSigninid(postemail.data.)
          // setcartid(postemail.data.post._id);
          // setpostingid("Successfully singed in");
          // setauthentication(false);
          // setproductmap(true);
        } else {
          setpostingid("Signing you in...");
        }
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "user already exist"
        ) {
          toast.error("User already exist please simply login");
        }

        console.error("failed to post cart data", error);
      }
    }
  }


  return (
    <div>



      <div className={` min-h-screen grid justify-items-center h-full w-full ${checked ?  "absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" : "absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"} `}>

        <Header/>


        <form
          className={checked ? "absolute top-50  filter:blur(2px) border-[4px]  border-white h-120 w-150 rounded-[10px] grid justify-items-center gap-y-10" : "absolute top-50 filter:blur(2px) border-[4px]  border-black h-120 w-150 rounded-[10px] grid justify-items-center gap-y-10" }
          onSubmit={postemaildata}
        >
          <div className={checked ? "text-white font-bold text-[40px]" : "text-black font-bold text-[40px]"}>Sign In Page</div>{" "}
          <div className=" font-[1000] text-yellow-500 text-[40px]">
            {postingid}
          </div>
          <input
            type="email"
            className={checked ? "border-b-2 border-b-white w-80 text-white focus:outline-none" : "border-b-2 border-b-black w-80 text-black focus:outline-none"}
            placeholder="Enter you'r email id"
            onChange={(e) => setform(e.target.value)}
          />
          <input
            type="email"
          className={checked ? "border-b-2 border-b-white w-80 text-white focus:outline-none" : "border-b-2 border-b-black w-80 text-black focus:outline-none"}
            placeholder="Enter Your'r Password"
            onChange={(e) => setpass(e.target.value)}
          />
          <button className={checked ? "btn bg-white text-black border-[#e5e5e5]  w-60" : "btn bg-green-600 text-black border-[#e5e5e5]  w-60"}>
            <svg
              aria-label="Email icon"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="black"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            Sign up with Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
