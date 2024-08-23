"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const SingleLabourView = ({ id }) => {
  const router = useRouter();
  const [labourDetails, setLabourDetails] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const fetchLabourDetails = async () => {
    try {
      let token = localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(
        `${baseUrl}api/labour/labour/single?Labourid=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLabourDetails(response.data.result);
    } catch (error) {
      console.error("Error fetching labour details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLabourDetails();
    }
  }, []);

  const handleDelete = async () => {
    let token = localStorage.getItem("token");
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.delete(`${baseUrl}/api/labour/labour/delete?labourid=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowConfirmDelete(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting labour:", error);
    }
  };

  if (!labourDetails) return <Spinner />;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(labourDetails).map(([key, value]) => {
          if (key === "employeePhoto") return null;
          return (
            <div key={key} className="flex flex-col">
              <span className="font-semibold text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              <span className="text-gray-900">{value}</span>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => router.push(`/labour/edit/${id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => setShowConfirmDelete(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Are you sure you want to delete this labour?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleLabourView;
