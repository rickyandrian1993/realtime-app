import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/ProductService";
import Swal from "sweetalert2";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const product = { name, qty, price };
    try {
      const data = await createProduct(product);
      if (data) {
        Swal.fire({
          title: "Success!",
          text: "Product has been added",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={submitHandler} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-800">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-800">Qty</label>
            <input
              type="number"
              name="qty"
              placeholder="Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-800">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </div>
          <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;