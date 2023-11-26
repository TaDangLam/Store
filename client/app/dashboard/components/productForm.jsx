'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;
const apiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;

const ProductForm = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [amount, setAmount] = useState(0);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get(apiCategory)
      .then((result) => setCategory(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddNewProperties = () => {
    // thêm 1 đối tượng vào cuối của mảng property và mỗi đối tượng có 2 thuộc tính là key và values
    setProperties((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveProperties = (indexToRemove) => {
    setProperties(prev => {
        // Hàm filter . true nhận false loại
        return [...prev].filter((p, pIndex) => pIndex !== indexToRemove);
      })
    }

  const handlePropertyKeyChange = (index, newKey) => {
    setProperties((prev) => {
      const property = [...prev];
      property[index].key = newKey;
      return property;
    });
  };

  const handlePropertyValuesChange = (index, newValues) => {
    setProperties((prev) => {
      const property = [...prev];
      property[index].value = newValues;
      return property;
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    setImages(fileList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('categories', categories);
    formData.append('price', price);
    formData.append('amount', amount);
    images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
    });
    properties.forEach((property, index) => {
        formData.append(`properties[${index}][key]`, property.key);
        formData.append(`properties[${index}][value]`, property.value);
    });
    await axios.post(apiProduct, formData);
    router.push('/dashboard/product');
  };

  console.log(images)
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-5">
        <div className=" flex flex-col ">
          <label className="text-blue-900" htmlFor="ProductName">
            Product Name
          </label>
          <input
            id="ProductName"
            type="text"
            placeholder="Product Name...."
            className="\1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className=" flex flex-col ">
          <label className="text-blue-900" htmlFor="Productcategory">
            Category
          </label>
          <select
            value={categories}
            onChange={(ev) => setCategories(ev.target.value)}
          >
            <option value="noCategory">No Category</option>
            {category.map((cate) => (
              <option value={cate._id}>{cate.name}</option>
            ))}
          </select>
        </div>

        <div className="flex item-center gap-4">
          <label
            onChange={handleImageChange}
            className="border w-24 h-24 text-center flex items-center justify-center rounded-lg bg-gray-200 cursor-pointer text-blue-900 hover:bg-blue-900 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input type="file" className="hidden" multiple />
          </label>
          <div className="flex items-center">
            You Have {images.length} photos
          </div>
        </div>

        <div className=" flex flex-col">
          <label className="text-blue-900" htmlFor="Productamount">
            Amount
          </label>
          <input
            id="Productamount"
            type="number"
            placeholder="Amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className="text-blue-900" htmlFor="Productprice">
            Price (in USD)
          </label>
          <input
            id="Productprice"
            type="number"
            placeholder="Price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-blue-900">
            Properties
          </label>
          <button onClick={handleAddNewProperties} type="button" className="text-white bg-blue-900 px-4 py-1 rounded-md w-52">Add New Properties</button>
          {properties.length > 0 &&
            properties.map((pro, index) => (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={pro.key}
                  onChange={(e) =>
                    handlePropertyKeyChange(index, e.target.value)
                  }
                  placeholder="property name (example: CPU)"
                />
                <input
                  type="text"
                  value={pro.value}
                  onChange={(e) =>
                    handlePropertyValuesChange(index, e.target.value)
                  }
                  placeholder="propperty value (example: i7 13900K)"
                />
                <button className="text-white bg-blue-900 px-4 py-1 rounded-md" type="button" onClick={() => handleRemoveProperties(index)}>Remove</button>
              </div>
            ))}
        </div>

        <button type="submit" className="text-white bg-blue-900  py-1 rounded-md w-16">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
