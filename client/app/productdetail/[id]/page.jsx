"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSkipPreviousCircle, BiSkipNextCircle } from "react-icons/bi";
import { BsCurrencyDollar, BsCaretRightFill } from "react-icons/bs";

import Spinner from "@/components/spinner";
import Spinner1 from "@/components/spinner1";

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;
const ApiCart = process.env.NEXT_PUBLIC_API_CART;

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [productDetail, setProductDetial] = useState(null);
  const [user, setUser] = useState(null);
  const [nameCategory, setNameCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    axios
      .get(ApiProduct + `/${id}`)
      .then((result) => setProductDetial(result.data));
  }, [id]);

  useEffect(() => {
    setLoading1(true);
    if (productDetail) {
      axios
        .get(ApiCategory + `/${productDetail?.categories}`)
        .then((res) => {
          setNameCategory(res.data);
          setLoading1(false);
        })
        .catch((err) => console.log(err));
    }
  }, [productDetail]);

  useEffect(() => {
    const userJSON = sessionStorage.getItem("user");
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  }, []);

  const handleBackHome = () => {
    router.push("/");
  };

  const handleBackCategoryPage = () => {
    const cateId = productDetail.categories;
    router.push(`/category/${cateId}`);
  };

  const handleAddToCart = async () => {
    const data = {
      orderBy: user?.user._id,
      items: [
        {
          productID: productDetail._id,
          amount: 1,
        },
      ],
    };

    await axios.post(ApiCart, data, {
        headers: {
          token: `Bearer ${user?.accessToken}`,
        },
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Product Is Successfully",
          showConfirmButton: false,
          color: "#f84c4c",
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const goToPreviousImg = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const goToNextImg = () => {
    if (currentImage < productDetail?.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const handleImageClick = (index) => {
    setCurrentImage(index);
  };
  console.log(user);
  // console.log(productDetail);
  return (
    <div className="">
      {loading1 ? (
        <div className="">
          <Spinner1 />
        </div>
      ) : (
        <div className="flex gap-2 py-6">
          <span
            className="text-2xl cursor-pointer hover:text-red-500 font-semibold"
            onClick={handleBackHome}
          >
            Home
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
          </svg>
          <span
            className="text-2xl cursor-pointer hover:text-red-500 font-semibold"
            onClick={handleBackCategoryPage}
          >
            {nameCategory?.name}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-2xl cursor-pointer text-red-500 font-semibold">
            {productDetail?.name}
          </span>
        </div>
      )}
      <div className="flex gap-4 h-983 w-full bg-white p-4">
        <div className="w-1/2 h-full">
          <div className="w-full h-3/5 relative group">
            <img
              src={
                ApiStaticFile +
                `/${productDetail?.name}/${productDetail?.images[currentImage]}`
              }
              alt="product thumbnail"
              className="w-full h-full rounded-lg object-contain"
            />
            <div>
              <BiSkipPreviousCircle
                className=" text-btn absolute left-0 top-1/2 transform -translate-y-1/2  cursor-pointer w-12 h-12 group-hover:block hidden"
                onClick={goToPreviousImg}
              />
            </div>
            <div>
              <BiSkipNextCircle
                className=" absolute right-0 top-1/2 transform -translate-y-1/2 text-btn cursor-pointer w-12 h-12 group-hover:block hidden"
                onClick={goToNextImg}
              />
            </div>
          </div>
          <div className=" h-2/5 flex p-5 gap-5 LamTa">
            {productDetail?.images.map((image, index) => (
              <div
                key={index}
                className={`w-28 h-28 p-1 rounded-lg border-2 ${
                  currentImage === index ? "border-btn" : "border-slate-300"
                } border-slate-300 hover:border-btn cursor-pointer`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={ApiStaticFile + `/${productDetail?.name}/${image}`}
                  alt="img-product"
                  className="w-full h-full object=cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full">
          <div className="text-3xl border-b border-category my-4">
            {productDetail?.name}
          </div>
          <div className="text-2xl font-medium my-5 flex">
            <span className="text-category">{productDetail?.price}</span>{" "}
            <BsCurrencyDollar />
          </div>
          <div className="">
            <ul className="properties-product">
              {productDetail?.properties.map((prop, index) => (
                <li key={index} className="my-1 flex items-center gap-2">
                  <div className="text-btn">
                    <BsCaretRightFill />
                  </div>
                  <div className="flex gap-2">
                    <p>{`${prop.key}: `}</p>
                    <p>{`${prop.value}`}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2 py-3 items-center">
            <button
              className="bg-btn hover:bg-red-700 text-white p-2 rounded-xl w-full text-lg font-semibold"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
          {/* <div className='bg-sky-300'>Add To Cart</div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
