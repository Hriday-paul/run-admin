"use client";
import { Avatar, Badge, Flex, Popover } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import avatarImg from "@/assets/image/profile.png";

import Link from "next/link";
import { Bell, LogOut, User } from "lucide-react";
import { useGetUserProfileQuery } from "@/redux/api/auth.api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUserDetails, logoutUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useNotificationsQuery } from "@/redux/api/notification.api";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {

  const { data: res, isSuccess, isError } = useGetUserProfileQuery();
  const { data: Notification, isSuccess : notiSuccess } = useNotificationsQuery({ isRead: false });
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(addUserDetails({ name: res?.data?.first_name, role: res?.data?.role, profilePicture: res?.data?.image || "/empty-user.png" }));
    }
    if (isError) {
      dispatch(logoutUser())
      router.push("/login")
    }
  }, [isError, router, isSuccess, res])

  const { user } = useSelector((state: RootState) => state.userSlice);

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/login")
  };

  return (
    <div className="flex items-center justify-between w-[97%] font-poppins pl-3">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-200 rounded p-1 duration-500 text-text-color"
        >
          <FaBars size={28} />
        </button>
        <div className="flex flex-col text-main-color">
          <h2 className="md:text-2xl text-lg  font-medium">
            Welcome, {user?.name}
            <span className="block  text-sm font-normal">Have a nice day!</span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={40}>
        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center bg-[#eceef1] items-center size-12 rounded-full cursor-pointer relative">
            {/* <IoNotificationsOutline size={24} color="#3A3C3B" /> */}
            <Bell size={24} color="#3A3C3B" />

            <Badge
              count={notiSuccess ? Notification?.data?.meta?.total : 0}
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                position: "absolute",
                top: "-24px",
                right: "-8px",
              }}
            ></Badge>
          </div>
        </Link>

        <Popover arrow={false} placement="topRight" content={<div className="w-40">

          <Link href={'/personal-information'} className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium hover:bg-slate-50 duration-200" >
            <User size={20} />
            <span className={`ml-3 transition-opacity duration-200`}>
              Profile
            </span>
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium hover:bg-slate-50 duration-200" >
            <LogOut size={20} />
            <span className={`ml-3 transition-opacity duration-200 text-red-500`}>
              Logout
            </span>
          </button>

        </div>} trigger={"click"}>

          <div className="flex items-center">
            <div className="flex flex-row gap-x-2 items-center cursor-pointer">

              <div>
                <h2 className="text-black text-base font-semibold text-end">{user?.name}</h2>
                <p className="text-gray-700 text-xs text-end">Admin</p>
              </div>

              <Avatar
                src={user?.profilePicture}
                size={40}
                className="border border-main-color size-12"
              ></Avatar>

            </div>
          </div>
        </Popover>

      </Flex>
    </div>
  );
};

export default Navbar;
