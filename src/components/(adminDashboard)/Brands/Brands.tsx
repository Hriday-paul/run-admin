"use client";
import {
    Button,
    Dropdown,
    Input,
    Spin,
    Table,
    TableColumnsType,
    Tag,
} from "antd";
import { ArrowDownWideNarrowIcon, Search } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { IBrand, IUser } from "@/redux/types";
import moment from "moment";
import { useAllBrandsQuery, useUpdateBrandStatusMutation } from "@/redux/api/brands.api";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AddBrand from "./AddBrand";

const Brands = () => {
    const [handleStatusUpdate, { isLoading: statusLoading }] = useUpdateBrandStatusMutation();
    const [searchText, setSearchText] = useState("");
    const query: { searchTerm: string } = { searchTerm: searchText };
    const { data, isLoading, isFetching } = useAllBrandsQuery(query);

    const columns: TableColumnsType<IBrand> = [
        {
            title: "#SL",
            dataIndex: "serial",
            render: (_, __, indx) => indx + 1
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            render(value) {
                return <Tag color={value == "pending" ? "yellow" : value == "rejected" ? "red" : "green"}>{value == "pending" ? "Pending" : value == "rejected" ? "Rejected" : "Approved"}</Tag>
            },
            filters: [
                {
                    text: "Pending",
                    value: "pending",
                },
                {
                    text: "Approved",
                    value: "approved",
                },
                {
                    text: "Rejected",
                    value: "rejected",
                },
            ],
            filterIcon: () => (
                <ArrowDownWideNarrowIcon
                    className="flex justify-start items-start"
                    color="var(--color-main)"
                />
            ),
            onFilter: (value, record) => record.status == value,
        },
        {
            title: "Date",
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
                                label: 'Approve',
                                key: '1',
                                icon: <CiCircleCheck className='text-green-500 size-4' />,
                                disabled: record?.status == "approved"
                            },
                            {
                                label: 'Reject',
                                key: '2',
                                icon: <CiCircleRemove className='text-red-500 size-4' />,
                                disabled: record?.status == "rejected"
                            },

                        ],
                        onClick: (e) => handleUpdateStatus(record?._id, e.key == "1" ? "approved" : "rejected")
                    }}>
                        <Button size='middle' type='primary'><HiOutlineDotsHorizontal size={20} /></Button>
                    </Dropdown>

                </div>
            ),
        },
    ];

    const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
        try {
            await handleStatusUpdate({ brandId: id, status }).unwrap();

            toast.success(`Brand ${status} successfully`)

        } catch (err: any) {
            toast.error(err?.data?.message || "something went wrong, try again")
        }
    };

    return (
        <>
            <div className="flex justify-end mb-5">
                <AddBrand />
            </div>
            <div className="bg-section-bg rounded-md shadow-md border border-main-color">
                <div className="flex justify-between items-center p-5 rounded-t-xl">
                    <h1 className="  text-xl text-text-color font-semibold">Brands List</h1>

                    <Input
                        className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                        placeholder="Search..."
                        onChange={(e) => setSearchText(e?.target?.value)}
                        prefix={<Search size={20} color="var(--color-main)"></Search>}
                    ></Input>

                </div>

                <div className="">
                    <Spin spinning={statusLoading} size='default'>
                        <Table<IBrand>
                            columns={columns}
                            dataSource={data?.data}
                            loading={isLoading || isFetching}
                            pagination={false}
                            rowKey={(record) => record?._id}
                            scroll={{ x: "max-content" }}
                        ></Table>
                    </Spin>

                </div>

            </div>
        </>
    );
};


export default Brands