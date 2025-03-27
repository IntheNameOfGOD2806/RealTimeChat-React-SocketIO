import MessageContainer from "../MessageContainer";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import useLogout from "../../hooks/useLogout";
import SideBar from "../SideBar/SideBar";
import "./Home.css";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
export default function Home() {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className=" navbar bg-base-100 shadow-sm"
       style={{
        marginTop: '-149px !important' 
      }}
      >
        <div className="flex-1">
          <a onClick={() => navigate("/")} className="btn btn-ghost text-xl">WeChat</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
           
            
          </div>
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
                <a className="justify-between" onClick={() => navigate("/profile")}>
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
      <div
        style={{
          height: "100vh",
        }}
        className="border border-solid rounded-2xl border-slate-500 backdrop-filter backdrop-blur-lg home-container flex flex-row  mx-auto"
      >
        <div className=" flex-grow-1 min-w-96   border-r border-solid border-slate-500">
          <SideBar />
        </div>
        <div className="flex-grow-3 h-5/6 w-full message-container relative px-8">
          <MessageContainer></MessageContainer>
        </div>
      </div>{" "}
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <button onClick={logout} className="btn btn-primary mt-6">
          Log Out
        </button>
        
      )}
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
}
