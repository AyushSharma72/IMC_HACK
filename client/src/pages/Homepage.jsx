import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { NavLink } from "react-router-dom";
import imclogo from "../assets/imclogo.png";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
          <img src={imclogo} className="mx-auto mb-8 w-40 h-40 rounded-full" alt="IMC Logo" />
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              Welcome to Indore Municipal Corporation
            </h1>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              इंदौर नगर निगम आपका स्वागत करता है
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Serving the people with dedication and integrity.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700">
                To serve the public efficiently and transparently.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Our Services
              </h2>
              <p className="text-gray-700">
                Providing various services to meet the needs of our community.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700">
                Get in touch with us for any inquiries or support.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
