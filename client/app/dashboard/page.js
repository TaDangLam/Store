"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner1 from "@/components/spinner1";

const apiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const apiUser = process.env.NEXT_PUBLIC_API_USER;
const apiOrder = process.env.NEXT_PUBLIC_API_ORDER;

const Dashboard = () => {
  const [userCount, setUserCount] = useState("");
  const [productCount, setProductCount] = useState("");
  const [orderCount, setOrderCount] = useState("");

  useEffect(() => {
    axios
      .get(apiProduct + `/count`)
      .then((result) => {
        setProductCount(result.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(apiUser + `/count`)
      .then((result) => {
        setUserCount(result.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(apiOrder + `/count`)
      .then((result) => {
        setOrderCount(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="items-center w-full h-1/2 p-2">
      <div>
        <div className="flex">
          Xin chào ... (không phải tài khoản ...? Hãy
          <span className="inline">
            <a
              className="flex items-center rounded-full mx-2 px-3 border-2 border-black"
              href=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-1"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span className="inline">thoát ra</span>
            </a>
          </span>
          và đăng nhập vào tài khoản của bạn)
        </div>
      </div>
      <div className="flex gap-2 items-center w-full h-1/2 p-2">
        <Link
          href={"/dashboard/product"}
          className="flex gap-2 w-1/3 border-2 border-slate-300 text-blue-700 rounded h-24"
        >
          <div className="flex flex-col items-center justify-center w-3/4 rounded h-24 text-center">
            <div className="flex items-center justify-center text-5xl">
              {productCount.count}
            </div>
            <div className="flex items-center justify-center">PRODUCT</div>
          </div>

          <div className="w-1/4 flex items-center text-center">
            <svg
              className="h-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
        </Link>
        <Link
          href={"/dashboard/user"}
          className="flex gap-2 w-1/3 border-2 border-slate-300 text-blue-700 rounded h-24"
        >
          <div className="flex flex-col items-center justify-center w-3/4 rounded h-24 text-center">
            <div className="flex items-center justify-center text-5xl">
              {userCount.count}
            </div>
            <div className="flex items-center justify-center">USER</div>
          </div>

          <div className="w-1/4 flex items-center text-center">
            <svg
              className="h-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
        </Link>
        <Link
          href={"/dashboard/order"}
          className="flex gap-2 w-1/3 border-2 border-slate-300 text-blue-700 rounded h-24"
        >
          <div className="flex flex-col items-center justify-center w-3/4 rounded h-24 text-center">
            <div className="flex items-center justify-center text-5xl">
              {orderCount.count}
            </div>
            <div className="flex items-center justify-center">ORDER</div>
          </div>
          <div className="w-1/4 flex items-center text-center">
            <svg
              className="h-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
