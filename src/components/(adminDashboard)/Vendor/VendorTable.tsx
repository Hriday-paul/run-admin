"use client";
import {
  Button,
  Dropdown,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
} from "antd";
import { CgUnblock } from "react-icons/cg";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useAllusersQuery, useBlock_unblockMutation, useDltUserMutation, useTransferRoleMutation } from "@/redux/api/users.api";
import { IUser } from "@/redux/types";
import moment from "moment";
import { MdBlockFlipped } from "react-icons/md";
import AddVendor from "./AddVendor";
import VendorManageSubs from "./VendorManageSubs";
import { GoDot } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const VendorTable = () => {
  const [handleStatusUpdate] = useBlock_unblockMutation();
  const [handleRoleUpdate] = useTransferRoleMutation();
  const [handleDlt] = useDltUserMutation();
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string, role: String } = { page, limit, searchTerm: searchText, role: "Vendor" };
  const { data, isLoading, isFetching } = useAllusersQuery(query);

  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData] = useState<IUser | null>(null)

  const columns: TableColumnsType<IUser> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1 + (page - 1) * limit
    },
    {
      title: "Full Name",
      dataIndex: "first_name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={record?.picture?.url || "/empty-user.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10 rounded-full"
          ></Image>
          <p>{text + " " + (record?.last_name ?? "")}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render(value) {
        return (value && value != "") ? value : "N/A"
      },
    },

    {
      title: "Phone number",
      dataIndex: "phone",
      render(value) {
        return (value && value != "") ? value : "N/A"
      },
    },
    {
      title: "Status",
      dataIndex: ["auth", "status"],
      render(value) {
        return <Tag color={value ? "green" : "red"}>{value ? "Active" : "Blocked"}</Tag>
      },
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2 ">
          {/* <Link href={'/user/2'}>
            <Eye
              size={22}
              color="var(--color-text-color)"
            />
          </Link> */}

          <Dropdown trigger={['click']} menu={{
            items: [
              {
                label: <Popconfirm
                  description={`User can not be access his vendor account`}
                  onConfirm={() => handleTransferRole(record?.id)}
                  okText="Yes"
                  cancelText="No"
                  title="Be sure transfer to the Vendor ?"
                // onConfirm={() => message.info("delete")}
                >
                  Swap to User
                </Popconfirm>,
                key: '1',
                icon: <GoDot className=' size-4' />,
              },
              {
                label: <Popconfirm
                  title="Block the vendor"
                  description={`Are you sure want to ${record?.auth?.status ? "block" : "unblock"} this vendor?`}
                  onConfirm={() => handleBlockUser(record?.id, !record?.auth?.status)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title={record?.auth?.status ? "Block" : "Unblock"}>
                    <button>
                      {record?.auth?.status ? "Block" : "Unblock"}
                    </button>
                  </Tooltip>
                </Popconfirm>,
                key: '2',
                icon: <GoDot className='size-4' />,
              },
              {
                label: <button onClick={() => {
                  setDefaultData(record)
                  setOpen(true)
                }}
                >Manage Sub.</button>,
                key: '5',
                icon: <GoDot className=' size-4' />,
              },
              {
                label: <Popconfirm
                  description={`All data will be lost, by this vendor.`}
                  onConfirm={() => handleDltUser(record?.id)}
                  okText="Yes"
                  cancelText="No"
                  title="Be sure Delete the Vendor ?"
                  className="text-red-500"
                // onConfirm={() => message.info("delete")}
                >
                  Delete
                </Popconfirm>,
                key: '3',
                icon: <GoDot className=' size-4' />,
              },
            ]
          }}>
            <Button size='small' type='primary'><HiOutlineDotsHorizontal size={20} /></Button>
          </Dropdown>

        </div>
      ),
    },
  ];

  // Block user handler
  const handleBlockUser = async (id: number, status: boolean) => {
    try {
      if (status) {
        await handleStatusUpdate({ userId: id, status }).unwrap();
      } else {
        await handleStatusUpdate({ userId: id, status }).unwrap();
      }

      toast.success(`Vendor ${status ? "unblock" : "block"} successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  };

  const handleDltUser = async (id: number) => {
    try {

      await handleDlt({ userId: id }).unwrap();

      toast.success(`User deleted successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  };

  const handleTransferRole = async (userId: number) => {
    try {
      await handleRoleUpdate({ userId, role: "User" }).unwrap();

      toast.success(`Role updated successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  }

  return (
    <div>

      <div className="flex justify-between items-center p-5 rounded-t-xl">
        <h1 className="  text-xl text-text-color font-semibold">Vendor List</h1>

        <div className="flex flex-row gap-x-2 items-center">
          <Input
            className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
            placeholder="Search..."
            onChange={(e) => setSearchText(e?.target?.value)}
            prefix={<Search size={20} color="var(--color-main)"></Search>}
          ></Input>
          <AddVendor />
        </div>

      </div>

      <div className="bg-white rounded-md border border-stroke">

        <Table<IUser>
          columns={columns}
          dataSource={data?.data?.data}
          loading={isLoading || isFetching}
          pagination={false}
          rowKey={(record) => record?.id}
          footer={() =>
            <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
          }
          scroll={{ x: "max-content" }}
        ></Table>

      </div>

      {defaultData && <VendorManageSubs open={open} setOpen={setOpen} defaultData={defaultData} />}

    </div>
  );
};

export default VendorTable;
