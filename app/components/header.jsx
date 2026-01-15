import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Checkoutproduct } from "./../context/context";
import Image from "next/image";

const Header = ({ setproductsArray, postdata }) => {
  const [allproduct, setallproduct] = useState([]);

  const { setchecked } = useContext(Checkoutproduct);

  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      localStorage.setItem("detectreload", "true");
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    const reload = localStorage.getItem("detectreload");

    if (reload === "true") {
      console.log("user pressed back or next");
    }
  }, []);

  // useEffect(() => {
  //   async function pro() {
  //     try {
  //       const res = await fetch("http://localhost:3000/server"); //    "_id:694fb4627d147eb2a01851e9"
  //       const bata=await res.json()
  //       const data=bata.data.dataforget[0].Allproducts

  //       console.log(data);
  //      setallproduct(data);
  //     } catch (error) {
  //       console.log("Failed to fetch data", error);
  //     }
  //   }

  //   pro();
  // }, []);

  // useEffect(() => {
  //   async function pro() {
  //     try {
  //       const res = await fetch("http://localhost:3000/server");
  //       const bata = await res.json();

  //       const data = bata.data.dataforget[0].Allproducts;

  //       console.log(data);
  //       setallproduct(data);
  //     } catch (error) {
  //       console.log("Failed to fetch data", error);
  //     }
  //   }

  //   pro();
  // }, []);

  // useEffect(() => {
  //   async function pro() {
  //     try {
  //       const res = await axios.get("http://localhost:3000/server"); //    "_id:694fb4627d147eb2a01851e9"

  //       console.log(res.data.dataforget[0].Allproducts);
  //      setallproduct(res.data.dataforget[0].Allproducts);
  //     } catch (error) {
  //       console.log("Failed to fetch data", error);
  //     }
  //   }

  //   pro();
  // }, []);

  // useEffect(() => {

  //     async function pro() {
  //    console.log("bobo",productsArray)
  //    setallproduct(productsArray)
  //     }

  //     pro();

  // },[])

  function filter(e) {
    setproductsArray((prev) => {
      if (e.target.value) {
        return prev.filter((i) => {
          const input = e.target.value.toLowerCase().trim();
          const name = i.name.toLowerCase();

          return name.includes(input);
        });
      } else {
        // return allproduct;
        return allproduct;
      }
    });
  }

  return (
    <div>
      <div className="bg-green-400 h-15 fixed z-1 top-0 right-0 w-full flex items-center ">
        <input
          className="border-4 h-10 w-130 absolute right-150"
          onChange={(e) => filter(e)}
          placeholder="Search for item's"
        />
  
         

 <label className="flex cursor-pointer gap-2 absolute right-30 bottom-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
              onClick={(e) => setchecked(e.target.checked)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>






        <Link href={"/checkout"} onClick={() => postdata()}>
          <Image
            alt="cart"
            height={30}
            width={40}
            src={"/online-shopping.png"}
            className="cursor-pointer absolute right-10 bottom-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
