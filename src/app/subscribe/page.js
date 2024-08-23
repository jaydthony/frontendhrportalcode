"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import withAuth from "../../components/withAuth";
import TextInput from "../../components/TextInput";
import MenuBar from "../../components/menubar";
import ToastLayout from "../../components/ToastLayout";
function Subscribe() {
  const [validity, setValidity] = useState("");
  const router = useRouter();

  const handleSubscribe = async () => {
    const token = localStorage.getItem("token");
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(
        `${baseUrl}api/payment/create/stripe?validity=${validity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        router.push(response.data.result);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  return (
    <ToastLayout>
      <section className="min-h-screen">
        <MenuBar />
        <div className="flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">Subscribe</h1>
            <TextInput
              label="Enter months of validity"
              name="validity"
              min={1}
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              type="number"
            />
            <button
              onClick={handleSubscribe}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </ToastLayout>
  );
}

export default withAuth(Subscribe);
