"use client"
import { useAllReportsQuery } from '@/redux/api/report.api';
import { IReport } from '@/redux/types';
import { Input, Pagination, Table, TableProps } from 'antd';
import { Eye, Search } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const ReportsContainer = () => {
    const [page, setPage] = useState(1);
    const limit = 10
    const [searchText, setSearchText] = useState("");
    const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
    const { isLoading, data, isFetching } = useAllReportsQuery(query)

    const columns: TableProps<IReport>["columns"] = [
        {
            title: "#SL",
            dataIndex: "serial",
            width: "50px",
            render: (_, __, indx) => indx + 1 + (page - 1) * limit
        },

        {
            title: "Reported By",
            dataIndex: ["user", "first_name"],
            width: "150px",
            render: (text, record) => (
                <div className="flex items-center gap-x-1">
                    <Image
                        src={record?.user?.image || "/empty-user.png"}
                        alt="profile-picture"
                        width={40}
                        height={40}
                        className="size-10 rounded-full"
                    ></Image>
                    <p className='line-clamp-1'>{text + " " + (record?.user?.last_name ?? "")}</p>
                </div>
            ),
        },

        {
            title: "Product",
            dataIndex: ["product", "title"],
            width: "250px",
            render: (text, record) => (
                <div className="flex items-center gap-x-1">
                    <Image
                        src={record?.product?.images[0] || "/empty-user.png"}
                        alt="product-picture"
                        width={40}
                        height={40}
                        className="size-10 rounded-md"
                    ></Image>
                    <p className='line-clamp-1'>{text}</p>
                </div>
            ),
        },


        {
            title: "Reason for Report",
            dataIndex: "reason",
            width: "500px",
            render: (value) => <p className='line-clamp-1'>{value}</p>
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            width: "220px",
            render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
        },
        {
            title: "Action",
            dataIndex: "_id",
            width: "50px",
            render: (value) => (
                <div className="flex gap-2 ">
                    <Link href={`/reportings/${value}`}>
                        <Eye
                            size={22}
                            color="var(--color-text-color)"
                        />
                    </Link>
                </div>
            ),
        },

    ];

    return (
        <div className='bg-section-bg rounded-md shadow-md border border-main-color'>

            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Reporting List</h1>

                <Input
                    className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                    placeholder="Search..."
                    onChange={(e) => setSearchText(e?.target?.value)}
                    prefix={<Search size={20} color="var(--color-main)"></Search>}
                ></Input>

            </div>

            <div className="">

                <Table<IReport>
                    columns={columns}
                    dataSource={data?.data?.data}
                    loading={isLoading || isFetching}
                    pagination={false}
                    rowKey={(record) => record?._id}
                    footer={() =>
                        <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
                    }
                    scroll={{ x: "max-content" }}
                ></Table>

            </div>

        </div>
    );
};

export default ReportsContainer;