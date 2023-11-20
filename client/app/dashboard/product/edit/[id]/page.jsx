'use client'
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const apiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;
const apiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const apiPhoto = process.env.NEXT_PUBLIC_API_STATIC_FILE;

const EditProduct = () => {
    const router = useRouter();
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const [amount, setAmount] = useState(0);
    const [properties, setProperties] = useState([]);
  
    useEffect(() => {
         axios.get(apiCategory)
            .then((result) => setCategory(result.data))
            .catch((err) => console.log(err));

         axios.get(apiProduct + `/${id}`)
            .then(result => {
                setProduct(result.data);
                setName(result.data.name);
                setCategories(result.data.categories);
                setPrice(result.data.price);
                setImages(result.data.images);
                setAmount(result.data.amount);
                setProperties(result.data.properties);
            })
            .catch(err => console.log(err));
    }, [id]);
  
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
      if(images.length > 0){
        images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }
      properties.forEach((property, index) => {
          formData.append(`properties[${index}][key]`, property.key);
          formData.append(`properties[${index}][value]`, property.value);
      });
      await axios.patch(apiProduct + `/${product._id}`, formData);
    };
  
    console.log(categories);
    return (
      <div>
        <div className="flex item-center gap-4">
                <Link href={'/dashboard/product'} className="text-blue-900 text-3xl mb-5 hover:text-btn font-semibold">Product</Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                <div href={'/dashboard/product/edit'} className="text-blue-900 text-3xl mb-5 hover:text-btn font-semibold">Update Product</div>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-5">
          <div className=" flex flex-col ">
            <label className="text-blue-900" htmlFor="ProductName">
              Product Name
            </label>
            <input
              id="ProductName"
              type="text"
              placeholder="Product Name...."
              className=""
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
            {!!images.length > 0 && images.map(img => (
              <img src={apiPhoto + `/${product.name}/${img}`} alt="productphoto" className="w-24 h-24 rounded-lg"/>
              
            ))}
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
            {properties.length > 0 && properties.map((pro, index) => (
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
  }
 
export default EditProduct;