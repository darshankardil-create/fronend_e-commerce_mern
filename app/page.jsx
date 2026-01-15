"use client";

import React, { Fragment } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useEffect, useState, useContext } from "react";

// import {productsArray} from './product_Array'

import { Checkoutproduct } from "./context/context";

import Header from "./components/header";

const PAGE = () => {
  const [productsArray, setproductsArray] = useState([]);
  const { addcart, setaddcart, checked, settokenid, tokenid } =
    useContext(Checkoutproduct);

  const [array30, setarray30] = useState(() => {
    const result = [];

    for (let x = 1; x < 30; x++) {
      result.push(x);
    }
    return result;
  });

  console.log(array30);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("https://backend-e-commerce-4-01hl.onrender.com/server"); //    "_id:694fb4627d147eb2a01851e9"

        console.log(res.data.dataforget[0].Allproducts);
        setproductsArray(res.data.dataforget[0].Allproducts);
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("Signinid");

    try {
      if (token) {
        async function avoid() {
          console.log("bo", token);
          // setauthentication(false);
          // setproductmap(true);

          const res = await fetch("https://backend-e-commerce-4-01hl.onrender.com/server/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.status === 404) {
            console.error(
              "failed to get id by auth token in get rwq status 404"
            );

            toast.error("account not found please create new account");
            return;
          }

          const jsonbro = await res.json();
          console.log("vvv", jsonbro, "resraw", res);

   
            settokenid(jsonbro.data._id);
          
        }
        avoid();
      }
    } catch (error) {
      // file:///Users/sanjaykardile/Library/Mobile%20Documents/com~apple~CloudDocs/Untitled.png
      //if error code execution stop no code after that can execute
    }
  }, []);

  async function postdata() {
    if (tokenid) {
      try {
        const updatecartdata = {
          Cart: addcart,
        };

        const putcart = await fetch(`https://backend-e-commerce-4-01hl.onrender.com/server/${tokenid}`, {
          method: "POST",
          body: JSON.stringify(updatecartdata),
          headers: {
            "Content-Type": "application/json", //auth also inheader  headers: { Authorization: `Bearer ${token}` }
          },
        });

        console.log("posted Successfully by fronend");

        const json2 = await putcart.json();

        console.log(json2);
      } catch (error) {
        console.error("Failed to post cartdata", error);
      }
    }
  }

  const [array, setarray] = useState([]);

  function productqty(e, product) {
    if (e.target.value === "") {
      setaddcart((prev) => prev.filter((i) => i.id !== product.id));
      return;
    }

    const selectedqty = Number(e.target.value);

    if (selectedqty === "") {
      setaddcart((prev) => prev.filter((i) => i.id !== product.id));
      return prev;
    }

    if (selectedqty > 30) {
      toast.error("Max limit for quantity is 30. ");
      return;
    }

    setarray((prev) => {
      const find = prev?.find((i) => i.id === product.id);

      if (find) {
        return prev.map((i) => {
          if (i.id === product.id) {
            return { ...i, qty: selectedqty };
          } else {
            return i;
          }
        });
      } else {
        if (selectedqty === 0) {
          prev.filter((i) => i.id !== product.id);
          return prev;
        }
        // return initial value in setexamle bit problematic but return works perfectly perfectly fine in normal function stops code execution
        return [...prev, { ...product, qty: selectedqty }];
      }
    });
  }

  // useEffect(() => {
  console.log("dropdown value changed saved to array with obj:", array);
  // }, [array]);
  //no need for useEffect beacause The whole component re-renders automatically with the setexample.

  function handleadd({ product }) {
    //41

    setaddcart((prev) => {
      const findinarray = array.find((i) => product.id === i.id);

      const qtyofproandarray = findinarray ? findinarray.qty : 1; // if array obj id and addtocart obj id doest match then set 1

      const find = prev.find((i) => i.id === product.id);

      if (find) {
        return prev.map((inprev) => {
          if (inprev.id === product.id) {
            return { ...inprev, qty: qtyofproandarray };
          } else {
            return inprev;
          }
        });
      } else {
        return [...prev, { ...product, qty: qtyofproandarray }];
      }
    });
  }

  console.log(addcart);

  return (
    <div>
      <Header
        setproductsArray={setproductsArray}
        productsArray={productsArray}
        postdata={postdata}
      />

      {/* for center https://docs.google.com/spreadsheets/d/1NuoBKHcd2zvkU354jLiQ5lf_-vOsl3pAK-7MWM78Xr0/edit?gid=1840512337#gid=1840512337 */}

      <div
        className={` grid lg:grid-cols-3 lg:gap-10 grid-cols-2 justify-items-center py-24 min-h-screen ${
          checked
            ? "min-h-screen relative inset-0  w-full items-center [background:radial-gradient(125%_125%_at_50%_50%,#000_30%,#63e_100%)]"
            : "min-h-screen relative  inset-0  w-full items-center  bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
        }  `}
      >
        {true &&
          productsArray.map((product) => {
            return (
              <Fragment key={product.id}>
                <div className="bg-gray-300 lg:h-100 lg:w-70 lg:mt-20  rounded-[15px]  ">
                  <div className="text-center font-bold text-[20px] mt-2 ">
                    {product.name}
                  </div>

                  <Image
                    alt={product.name}
                    height={230}
                    width={230}
                    src={product.imgsrc}
                    className="mx-auto mt-5 h-60 object-cover border-none rounded-lg  "
                  />

                  <div className="grid grid-cols-2 gap-3.5 relative top-1 left-6">
                    <div className="relative top-1 left-5">PRICE:</div>
                    <div className=" font-bold text-green-900 text-[20px] flex gap-15">
                      ₹{product.price}
                    </div>{" "}
                    {/*relative left-10 top-3 */}
                    {/* block makes any element block element like div and mx-auto It tells the browser: “Take automatic left and right margins so that the 

element is centered horizontally within its parent.” */}
                    <button
                      className="btn btn-soft btn-warning bg-green-300 rounded-lg  block text-blue-600   " //relative top-5 left-5
                      onClick={() => {
                        {
                          handleadd({ product: product });
                        }
                      }}
                    >
                      ADD TO CART
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      placeholder="Quantity:1"
                      list="qty"
                      className=" border-2 w-20 placeholder:text-black text-[10px] rounded-lg h-10  " //relative bottom-5 left-42
                      onChange={(e) => {
                        productqty(e, product);
                      }}
                      value={array?.find((i) => i.id === product.id)?.qty || ""} // optional chaining (?) because at starting it is [] so || give ""
                      //  convertion of "" into 0 https://chatgpt.com/share/69520147-5d40-8005-a9ca-45eb2c33a118
                      //in starting "" doest cause troble because code is never run it sorts the issue over here only if undfine || " " no codition is applyed on " "
                    />
                  </div>

                  <datalist id="qty">
                    {array30.map((x) => {
                      return (
                        <Fragment key={x}>
                          <option value={x}>{x}</option>
                        </Fragment>
                      );
                    })}
                  </datalist>
                </div>
              </Fragment>
            );
          })}

        {/* {authentication && (
        
        )} */}
      </div>
    </div>
  );
};

export default PAGE;
