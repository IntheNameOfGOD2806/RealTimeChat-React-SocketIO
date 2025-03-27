import { useState } from "react";

import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router";
import { isString } from "antd/es/button";
import {
  deleteFile,
  handleFileUpload,
  updateUser,
} from "../../services/apiService";
import toast from "react-hot-toast";
import { extractPublicId } from "../../utils/extractPublicId";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: authUser?.username,
    fullName: authUser?.fullName,
    gender: authUser?.gender,
    profilePicture: authUser?.profilePicture,
  });
  const handleUpdateUser = async () => {
    setLoading(true);
    let profilePictureURL;
    if (!isString(inputs.profilePicture)) {
      profilePictureURL = await handleFileUpload(inputs.profilePicture);
    } else {
      profilePictureURL = inputs.profilePicture;
    }
  
    const response = await updateUser({
      ...inputs,
      _id: authUser._id,
      profilePicture: profilePictureURL,
    });
    if (response.error) {
      toast.error(response.error);
      setLoading(false);
    }
    if (response?.success) {
      //delete old profile picture
      if (isString(authUser.profilePicture)) {
        const publicId = extractPublicId(authUser.profilePicture);
        await deleteFile(publicId);
      }
      toast.success("Update profile successfully");
      setAuthUser({
        ...response.data,
      });
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFileUpload1 = (e) => {
    const file = e.target.files[0];
    setInputs({ ...inputs, profilePicture: file });
  };
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <>
      <div className=" navbar bg-base-100 shadow-sm "
      style={{
        // marginTop: '-140px' 
      }}
      >
        <div className="flex-1">
          <a onClick={() => navigate("/")} className="btn btn-ghost text-xl">
            WeChat
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={authUser?.profilePicture}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 border border-solid rounded-2xl border-slate-500 backdrop-filter backdrop-blur-lg home-container flex flex-row gap-2  mx-auto">
        {/* Ảnh đại diện */}
        <div
          style={{
            minWidth: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
          className="avatar mb-4"
        >
          <img
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
            src={
              isString(inputs.profilePicture)
                ? inputs.profilePicture
                : URL.createObjectURL(inputs.profilePicture)
            }
            alt="Profile"
          />

          {/* Chọn ảnh mới */}
          <input
            style={{
              width: "200px",
              marginTop: "40px",
            }}
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={handleFileUpload1}
          />
        </div>

        {/* Form thông tin */}
        <div className="mt-4 w-full">
          <label className="label font-bold text-lg">Username</label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
          />

          <label className="label font-bold text-lg">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={inputs.fullName}
            onChange={handleInputChange}
          />

          <label className="label font-bold text-lg">Gender</label>
          <select
            name="gender"
            className="select select-bordered w-full"
            value={inputs.gender}
            onChange={handleInputChange}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          {/* Nút cập nhật */}
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleUpdateUser}
          >
            {loading ? (
              <span className="loading loading-dots loading-xl"></span>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
