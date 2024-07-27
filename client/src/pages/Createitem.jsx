import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "../components/layout/Header2";
import { useAuth } from "../Context/auth";
const Createitem = () => {
  const [materials, setMaterials] = useState([]);
  const [auth, setAuth] = useAuth();
  const [form, setForm] = useState({
    MaterialName: "",
    Description: "",
    quantity: "",
    UnitPrice: "",
    Seller: "",
    lifetime: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/materials/addmaterials/${auth?.supplier?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMaterials([...materials, data.material]);
        toast.success("Material added successfully");
        setForm({
          MaterialName: "",
          Description: "",
          quantity: "",
          UnitPrice: "",
          Seller: "",
          lifetime: "",
        });
      } else {
        toast.error("Name Should Be Unique");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header2 />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md mt-6"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            Create New Material
          </h1>
          {[
            "MaterialName",
            "Description",
            "quantity",
            "UnitPrice",
            "Seller",
            "lifetime",
          ].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mt-1"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Material"}
          </button>
        </form>

        <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Materials</h2>
          {materials.length > 0 ? (
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Description
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Quantity
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Unit Price
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Seller
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Lifetime
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      {material.MaterialName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      {material.Description}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      {material.quantity}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      {material.UnitPrice}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      {material.Seller}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      {material.lifetime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No materials found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Createitem;
