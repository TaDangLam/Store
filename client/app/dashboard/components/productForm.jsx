import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    categories: "",
    price: 0,
    amount: 0,
    properties: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className=" flex flex-col bg-slate-300">
          <label htmlFor="ProductName">Product Name</label>
          <input
            id="ProductName"
            type="text"
            placeholder="Product Name...."
            className="outline"
          />
        </div>

        <div className=" flex flex-col bg-slate-300">
          <label htmlFor="Productcategory">Category</label>
          <select name="" id=""></select>
        </div>

        <div className="flex flex-col bg-rose-200 bg-slate-300">
            <label htmlFor="">Photos</label>
            <div>aaaaaaaaaaaa</div>
        </div>

        <div className=" flex flex-col bg-slate-300">
          <label htmlFor="Productamount">Amount</label>
          <input id="Productamount" type="number" placeholder="Amount..." />
        </div>

        <div className="flex flex-col bg-slate-300">
          <label htmlFor="properties">Properties (JSON Format)</label>
          <textarea id="properties" name="properties" />
        </div>

        <div className=" flex flex-col bg-slate-300">
          <label htmlFor="Productprice">Price (in USD)</label>
          <input id="Productprice" type="number" placeholder="Price..." />
        </div>
        <button type="submit" className="btn-primary mt-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
