"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const apiUser = process.env.NEXT_PUBLIC_API_USER;
const apiUserLogOut = process.env.NEXT_PUBLIC_API_LOG_OUT;

const InfomationPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [phone, setPhone] = useState("");

  const [isPasswordEditable, setPasswordEditable] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  const getUserFromSessionStorage = () => {
    const userJSON = sessionStorage.getItem("user");
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
    console.log(user)
  };
  
  useEffect(() => {
    getUserFromSessionStorage();
  }, []);

  useEffect(() => {
    setName(user?.user.name);
    setEmail(user?.user.email);
    setAddress(user?.user.address);
    setProvince(user?.user.province);
    setPhone(user?.user.phone);
    setPassword(user?.user.password);
    setRepeatPassword(user?.user.password);
  }, [user]);

  const handleCheckboxChange = () => {
    setPasswordEditable(!isPasswordEditable);
    if (isPasswordEditable) {
      setPassword("");
      setRepeatPassword("");
    }
  };

  const handleLogout = async () => {
    try {
      const result = await axios.post(apiUserLogOut);
      sessionStorage.removeItem("user");
      console.log("logout successful");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user?.user._id)

  const handleSubmit = (e) => {
    e.preventDefault();
    const userToUpdate = {
      id: user?.user.id, 
      name: 'New Name',
      email: 'newemail@example.com',
      username: 'newUsername',
      password: 'newPassword',
      phone: 'newPhone',
      province: 'newProvince'
  };
  }
  
  return (
    <div className="">
      <div className="flex h-full gap-5">
        <div className=" w-full h-full ">
          <form onSubmit={handleSubmit} className="w-full p-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Province
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="province"
                  type="text"
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div
              className={`flex flex-wrap -mx-3 mb-6 py-3 rounded-md ${
                !isPasswordEditable ? "bg-gray-300 text-gray-500" : "" // Add a different background color or style when not editable
              }`}
            >
              <div className="w-full px-3 mb-6">
                <h2 className="text-xl w-full mb-6 uppercase font-bold">
                  Change password
                </h2>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                    !isPasswordEditable ? "bg-gray-300" : "" // Add a different background color or style when not editable
                  }`}
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  disabled={!isPasswordEditable}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-gray-600 text-xs italic">
                  Keep blank if you don't want to change
                </p>
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Repeat Password
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                    !isPasswordEditable ? "bg-gray-300" : "" // Add a different background color or style when not editable
                  }`}
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  disabled={!isPasswordEditable}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-pink-600"
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2 text-gray-700">
                    Enable Password Change
                  </span>
                </label>
              </div>
            </div>
            <button type="submit" className="bg-gradient-to-r from-signup-left to-signup-right hover:from-signup-right hover:to-signup-left text-white font-bold py-2 px-4 mx-3 w-36 rounded">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfomationPage;
