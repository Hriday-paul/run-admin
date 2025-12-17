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
import { CircleDot, Search } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useAllusersQuery, useBlock_unblockMutation, useDltUserMutation, useTransferRoleMutation } from "@/redux/api/users.api";
import { IUser } from "@/redux/types";
import moment from "moment";
import { GoDot } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const UsersTable = () => {
  const [handleStatusUpdate] = useBlock_unblockMutation();
  const [handleRoleUpdate] = useTransferRoleMutation();
  const [handleDlt] = useDltUserMutation();
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string, role: String } = { page, limit, searchTerm: searchText, role: "User" };
  const { data, isLoading, isFetching } = useAllusersQuery(query);

  const handleTransferRole = async (userId: number) => {
    try {
      await handleRoleUpdate({ userId, role: "Vendor" }).unwrap();

      toast.success(`Role updated successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  }

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
                  Swap to Vendor
                </Popconfirm>,
                key: '1',
                icon: <GoDot className=' size-4' />,
              },
              {
                label: <Popconfirm
                  title="Block the user"
                  description={`Are you sure want to ${record?.auth?.status ? "block" : "unblock"} this user?`}
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
                label: <Popconfirm
                  description={`All data will be lost, by this user.`}
                  onConfirm={() => handleDltUser(record?.id)}
                  okText="Yes"
                  cancelText="No"
                  title="Be sure Delete the User ?"
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

      toast.success(`User ${status ? "unblock" : "block"} successfully`)

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

  return (
    <div>

      <div className="flex justify-between items-center p-5 rounded-t-xl">
        <h1 className="  text-xl text-text-color font-semibold">Users List</h1>

        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search Users..."
          onChange={(e) => setSearchText(e?.target?.value)}
          prefix={<Search size={20} color="var(--color-main)"></Search>}
        ></Input>

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

    </div>
  );
};

export default UsersTable;
