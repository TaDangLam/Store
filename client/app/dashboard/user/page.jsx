"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import Spinner1 from "@/components/spinner1";
const apiUser = process.env.NEXT_PUBLIC_API_USER;

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const border1 = "border border-slate-400";
  const border2 = border1 + " font-semibold text-xl";

  useEffect(() => {
    const userJSON = sessionStorage.getItem("user");
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUser, {
        headers: {
          token: `Bearer ${user?.accessToken}`,
        },
      })
      .then((result) => {
        setUserData(result.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user]);

  console.log(userData);

  return (
    <div className="">
      {loading ? (
        <div className="text-center p-40">
          <Spinner1 />
        </div>
      ) : (
        <div>
          <div className="text-blue-900 text-3xl mb-5 font-semibold">
            User List
          </div>
          <table
            className={`table-auto border-collapse ${border1} w-11/12 mt-5 ml-2`}
          >
            <thead>
              <tr className="bg-blue-900 text-white text-center">
                <td className={border2}>User Name</td>
                <td className={border2}>Name</td>
                <td className={border2}>ID</td>
                <td className={border2}>Province</td>
                <td className={border2}>Phone</td>
                <td className={border2}>Email</td>
                <td className={border2}></td>
              </tr>
            </thead>
            <tbody>
              {userData.map((data) => (
                <tr key={data._id}>
                  <td className={`${border1} pl-2`}>{data.username}</td>
                  <td className={`${border1} pl-2`}>{data.name}</td>
                  <td className={`${border1} pl-2 text-center`}>{data._id}</td>
                  <td className={`${border1} pl-2 text-center`}>
                    {data.province}
                  </td>
                  <td className={`${border1} pl-2 text-center`}>
                    {data.phone}
                  </td>
                  <td className={`${border1} pl-2 text-center`}>
                    {data.email}
                  </td>
                  <td
                    className={`${border1} pl-2 text-center p-2 flex justify-center`}
                  >
                    <Link
                      href={`/dashboard/user/${data._id}`}
                      className="flex bg-slate-400 p-2 gap-1 rounded-lg text-white hover:bg-red-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPage;
