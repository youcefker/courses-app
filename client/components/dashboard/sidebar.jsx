import Image from "next/image";

import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import VerifiedIcon from '@mui/icons-material/Verified';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { Transition } from "@headlessui/react";
import { Button } from "@mui/material";


const Sidebar = ({ active }) => {
  const [activeItem, setActiveItem] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActiveItem(active);
  }, [active]);

  return (
    <>
    <div className="hidden lg:flex w-[250px] fixed h-[100vh] bg-white flex flex-col  py-4   shadow">
     
      <Image src="/images/footer_logo.svg" width={60} height={60} />
      <ul className="flex flex-col justify-start items-stretch w-full my-8">
        <li
          onClick={() => {
            setActiveItem("dashboard");
            router.push("/dashboard");
          }}
          className={
            activeItem === "dashboard"
              ? "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#079C49] relative"
              : "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#9DA6BA] relative"
          }
        >
          {" "}
          <HomeIcon className="mr-2 text-[22px]" />Dashboard
     
        </li>
      
       
  
        <li
          onClick={() => {
            setActiveItem("courses");
            router.push("/courses/list");
          }}
          className={
            activeItem === "courses"
              ? "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#079C49] relative"
              : "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#9DA6BA] relative"
          }
        >
          {" "}
          <MenuBookIcon className="mr-2 text-[22px]" /> Courses
        
        </li>
      </ul>

     
      

      
    

      <div className="mt-auto py-3 flex flex-col justify-center ">
     
         <span className="my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#9DA6BA] relative"><LogoutIcon className="mr-2 text-[24px]" />Log out</span>
      </div>
    </div>



    <div className="lg:hidden mb-8 flex justify-between p-3">
<div className='w-[62px] h-[62px] cursor-pointer ' style={{position: "relative"}}>
            <Image src="/images/footer_logo.svg" onClick={() => router.push("/")}  layout="fill"
             objectFit="cover"/>
          </div>
          
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md    focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
           
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            
            <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="lg:hidden" id="mobile-menu">
            <ul className="flex flex-col justify-center items-center w-full my-8">
                <li
                  onClick={() => {
                    setActiveItem("dashboard");
                    router.push("/dashboard");
                  }}
                  className={
                    activeItem === "dashboard"
                      ? "my-3 hover:text-[#079C49] font-semibold flex items-center  cursor-pointer text-[14px] text-[#079C49] relative"
                      : "my-3 hover:text-[#079C49] font-semibold flex items-center  cursor-pointer text-[14px] text-[#9DA6BA] relative"
                  }
                >
                  {" "}
                  <HomeIcon className="mr-2 text-[22px]" />Dashboard
             
                </li>
              
               
          
                <li
                  onClick={() => {
                    setActiveItem("courses");
                    router.push("/courses/list");
                  }}
                  className={
                    activeItem === "courses"
                      ? "my-3 hover:text-[#079C49] font-semibold flex items-center  cursor-pointer text-[14px] text-[#079C49] relative"
                      : "my-3 hover:text-[#079C49] font-semibold flex items-center  cursor-pointer text-[14px] text-[#9DA6BA] relative"
                  }
                >
                  {" "}
                  <MenuBookIcon className="mr-2 text-[22px]" /> Courses
                
                </li>
               </ul>
               <div className=" flex flex-col justify-center items-center">
                  
                  <span className="my-3 hover:text-[#079C49] font-semibold flex items-center   cursor-pointer text-[14px] text-[#9DA6BA] relative"><LogoutIcon className="mr-2 text-[24px]" />Log out</span>
               </div>
            </div>
          )}
        </Transition>
    </>
  );
};
export default Sidebar;