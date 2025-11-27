"use client";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { navLinks } from "@/utils/navLinks";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/userSlice";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {

  const router = useRouter();
  const dispatch = useDispatch();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      dispatch(logoutUser())
      router.push("/login")
    }
  };

  const currentPathname = usePathname()?.replace("/", "")?.split(" ")[0];

  return (
    <Sider
      width={280}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        paddingInline: `${collapsed ? "5px" : "10px"}`,
        backgroundColor: "var(--color-secondary)",
        maxHeight: "100vh",
        overflow: "auto",
        // boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)"
        borderRight: "1px solid #824902",
      }}
    >
      <div className="demo-logo-vertical" />
      {/* logo  */}
      <div className="my-10 flex flex-col justify-center items-center gap-y-5 ">
        <Link href={"/"} className={`bg-main-color rounded-full ${collapsed ? "p-2" : "p-4"}`}>
          <Image
            src={logo}
            alt="logo_Image"
            className={` ${collapsed ? "size-12" : "size-32"}`}
          />
        </Link>
      </div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu text-lg space-y-4 !border-none"
        items={navLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
