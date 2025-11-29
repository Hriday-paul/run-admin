import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { Bell, BookOpen, Dot, MessageCircleMore } from "lucide-react";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { FaRegRectangleList } from "react-icons/fa6";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={24} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "user",
    icon: <LuUsers size={24} />,
    label: <Link href={"/user"}>Users</Link>,
  },
  {
    key: "vendors",
    icon: <HiOutlineUserPlus size={24} />,
    label: <Link href={"/vendors"}>Vendors</Link>,
  },
  {
    key: "payments",
    icon: <FaRegRectangleList size={24} />,
    label: <Link href={"/payments"}>Payments</Link>,
  },
  {
    key: "supports",
    icon: <MessageCircleMore size={24} />,
    label: <Link href={"/supports"}>Supports</Link>,
  },
  {
    key: "reportings",
    icon: <BookOpen size={24} />,
    label: <Link href={"/reportings"}>Reporting</Link>,
  },
  {
    key: "notifications",
    icon: <Bell size={24} />,
    label: <Link href={"/notifications"}>Notifications</Link>,
  },
  {
    key: "settings",
    icon: <IoSettingsOutline size={24} />,
    label: <Link href={"/settings"}>Settings</Link>
    // children: [
    //   {
    //     key: "change-password",
    //     icon: <Dot />,
    //     label: <Link href={"/change-password"}>Change Password</Link>
    //   },
    //   {
    //     key: "terms-condition",
    //     icon: <Dot />,
    //     label: <Link href={"/terms-condition"}>Terms & Condition</Link>
    //   },
    // ]
  },
  {
    key: "logout",
    icon: <IoMdLogOut size={24} />,
    label: <Link href={"/login"}>Logout</Link>,
  },
];
