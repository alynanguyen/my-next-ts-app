'use client'

import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "@heroui/react";

export default function FormPage() {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ username: "", email: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ username: "", email: "" });
  };

  // Hide success message after 5 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            User Form
          </h2>

          <Input
            isRequired
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />

          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="flex justify-between mt-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-md transition-colors duration-200"
            >
              Submit
            </Button>

            <Button
              type="reset"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded transition-colors duration-200"
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-fadeInOut">
          Form submitted successfully!
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut 5s ease forwards;
        }
      `}</style>
    </div>
  );
}
