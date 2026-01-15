"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { Checkoutproduct } from "./../context/context";
import Header from "./../components/header";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const Checkout = useContext(Checkoutproduct); //without destruc

  const [array, setarray] = useState([]);
  const [cartempty, setcartempty] = useState(true);
  const [gotoshop, setgotoshop] = useState(false);

  const [id, setid] = useState("");

  // const{tokenid}=useContext(Checkoutproduct) //with destruc

  useEffect(() => {
    const token = localStorage.getItem("Signinid");

    async function me() {
      const fetch2 = await fetch("https://backend-e-commerce-4-01hl.onrender.com/server/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jsonify = await fetch2.json();
      console.log("momo", jsonify.data._id);
      const id = jsonify.data._id;
      setid(id);
    }

    me();
  }, []);

  useEffect(() => {
    async function a() {
      if (id) {
        const Fetch = await axios.get(`https://backend-e-commerce-4-01hl.onrender.com/server/${id}`);

        console.log(Fetch);

        setarray(() => {
          if (Fetch.data.databyme.Cart.length > 0) {
            return Fetch.data.databyme.Cart;
          } else if (Fetch.data.databyme.Cart.length === 0) {
            setcartempty(false);
            setgotoshop(true);
            return [];
          } else {
            return Fetch.data.databyme.Cart;
          }
        });
      }
    }

    a();
  }, [id, Checkout.addcart]);

  console.log(Checkout.addcart);

  // const redirectto = useRouter();

  return (
    <div>
      <Header />

      {/* <div className="bg-gray-300 h-100"></div> */}
      <div
        className={`min-h-screen w-full  grid grid-cols-1 gap-20 justify-items-center pt-60 ${
          Checkout.checked
            ? "min-h-screen relative inset-0  w-full items-center [background:radial-gradient(125%_125%_at_50%_50%,#000_30%,#63e_100%)]"
            : "min-h-screen relative  inset-0  w-full items-center  bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
        }`}
      >
        {cartempty &&
          array.map((i) => {
            return (
              <div key={i.id}>
                <div className="h-60 w-200 bg-amber-50 outline-1 flex ">
                  <div className="pt-6 pl-7">
                   
                    {
                      <Image
                        width={200}
                        height={200}
                        alt={i.name}
                        src={i.imgsrc}
                        className="h-50 w-50"
                      />
                    }
                  </div>
                  <div className="font-[1000] text-[25px] mx-auto">{i.name}</div>
                </div>
              </div>
            );
          })}

        {gotoshop && (
          <>
            <Image
              src="/delete.png"
              width={200}
              height={200}
              alt="no product found"
              className="absolute top-50"
            />
            <button className="absolute p-10 bg-amber-400 cursor-pointer rounded-[30px] top-120 left-150 text-[20px] font-bold" onClick={() => window.history.back() }>
              Start Shopping
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;

//pretty print and all 3 JSON.stringify all 3 parameter  file:///Users/sanjaykardile/Downloads/Json%20Replacer%20Explained.pdf