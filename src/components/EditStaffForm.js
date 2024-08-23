"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchStaffData } from "./fetchStaffData";
import { useRouter } from "next/navigation";
import CreateStep1 from "./CreateStep1";

const EditStaffForm = ({ staffId }) => {
  const router = useRouter();

  let token;
  const [data, setData] = useState({
    id: "",
    fullName: "",
    mobilePhone: "",
    email: "",
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    token = localStorage.getItem("token");
    const loadStaffData = async () => {
      const staffData = await fetchStaffData(staffId, token);
      setData(staffData);
    };
    loadStaffData();
  }, [staffId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    token = localStorage.getItem("token");
    e.preventDefault();
    try {
      console.log("Data", data);
      console.log("token", token);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.put(
        `${baseUrl}api/company/staff/info/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Staff info updated successfully:", response.data.result);
      router.push("/dashboard");
    } catch (error) {
      alert("Error updating staff info:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CreateStep1 data={data} handleChange={handleChange} />

      <div className="flex justify-between">
        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditStaffForm;
