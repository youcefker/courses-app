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


const Sidebar = ({ active }) => {
  const [activeItem, setActiveItem] = useState("");
  const router = useRouter();


  useEffect(() => {
    setActiveItem(active);
  }, [active]);

  return (
    <div className="w-[250px] fixed h-[100vh] bg-white flex flex-col  py-4   shadow">
     
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
            router.push("/courses");
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
  );
};
export default Sidebar;