"use client";
import { Image, Table, TableColumnsType } from "antd";
import { IUser } from "@/redux/types";
import { useAllusersQuery } from "@/redux/api/users.api";
import moment from "moment";
import ErrorComponent from "@/components/shared/ErrorComponent";

const LatestUser = () => {

  const { isLoading, isFetching, data, isError } = useAllusersQuery({ limit: 10 })

  const columns: TableColumnsType<IUser> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1
    },
    {
      title: "Full Name",
      dataIndex: "first_name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={record?.image || "/empty-user.png"}
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
    },

    {
      title: "Phone number",
      dataIndex: "contact",
      render(value) {
        return (value && value != "") ? value : "N/A"
      },
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    }
  ];

  if(isError){
    return <ErrorComponent />
  }

  return (
    <div className="bg-section-bg rounded-md shadow-md border border-main-color p-2">
      <h3 className="text-xl text-main-color px-5 pb-5">Recent Joined Users</h3>
      <Table<IUser>
        columns={columns}
        dataSource={data?.data?.data}
        loading={isLoading || isFetching}
        pagination={false}
        rowKey={(record) => record?._id}
        scroll={{ x: "max-content" }}
      ></Table>
    </div>
  );
};

export default LatestUser;
