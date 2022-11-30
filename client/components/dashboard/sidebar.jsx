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
import GroupsIcon from '@mui/icons-material/Groups';

const Sidebar = ({ active }) => {
  const [activeItem, setActiveItem] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState(true)
    const [fetched, setFetched] = useState(false)
    
    const fetchStorageData = () => {
        const role =  localStorage.getItem("role")
        const data = role ? role : null
        return data
    } 
    useEffect(() => {
      const role = fetchStorageData()
        if(role === "admin") {
          setStudent(false)
        } else if(role === "student") {
          setStudent(true)
        } else {
          router.replace('login')
        }
    }, [])

  const handleLogout =  () => {
    localStorage.clear()
    router.replace("/")
  }
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
      
       
  
        {!student ? <li
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
        
        </li> : null}

        {student ?<li
          onClick={() => {
            setActiveItem("courses");
            router.push("/student/courses/list");
          }}
          className={
            activeItem === "courses"
              ? "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#079C49] relative"
              : "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#9DA6BA] relative"
          }
        >
          {" "}
          <MenuBookIcon className="mr-2 text-[22px]" /> Courses
        
        </li> : null}



        {!student ? <li
          onClick={() => {
            setActiveItem("meets");
            router.push("/meets/list");
          }}
          className={
            activeItem === "meets"
              ? "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#079C49] relative"
              : "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#9DA6BA] relative"
          }
        >
          {" "}
          <GroupsIcon className="mr-2 text-[22px]" /> Meets
        
        </li> : null}

        {student ?<li
          onClick={() => {
            setActiveItem("meets");
            router.push("/student/meets/invitMeets");
          }}
          className={
            activeItem === "meets"
              ? "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#079C49] relative"
              : "my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#9DA6BA] relative"
          }
        >
          {" "}
          <GroupsIcon className="mr-2 text-[22px]" /> Meets
        
        </li> : null}
      </ul>

     
      

      
    

      <div className="mt-auto py-3 flex flex-col justify-center " onClick={handleLogout}>
     
         <span className="my-3 hover:text-[#079C49] font-semibold flex items-center pl-10  cursor-pointer text-[14px] text-[#9DA6BA] relative"><LogoutIcon className="mr-2 text-[24px]" />Log out</span>
      </div>
    </div>



    <div className="lg:hidden pb-5 flex justify-between p-3 sm:bg-[#F5F5F5]">
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
            <div className="lg:hidden sm:bg-[#F5F5F5]" id="mobile-menu">
              
            <ul className="flex flex-col justify-center items-center w-full mb-5">
                <div  className='sm:hidden mb-8 border-2 border-[#079C49] rounded-full w-[50px] h-[50px] overflow-hidden cursor-pointer' style={{position: "relative"}} onClick={() => router.push("/profile")}>
                    <Image src="/images/main1.png"  layout="fill"
                 objectFit="cover"/>
                </div>
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
              
               
          
                {!student ? <li
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
                
                </li> : null}
               </ul>
               <div className=" flex flex-col justify-center items-center" onClick={handleLogout}>
                  
                  <span className="my-3 hover:text-[#079C49] font-semibold flex items-center   cursor-pointer text-[14px] text-[#9DA6BA] relative"><LogoutIcon className="mr-2 text-[24px]" />Log out</span>
               </div>
            </div>
          )}
        </Transition>
    </>
  );
};
export default Sidebar;