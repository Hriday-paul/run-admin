"use client"
import { useAllOrdersQuery } from '@/redux/api/orders.api';
import { IOrder} from '@/redux/types';
import { Button, Dropdown, Input, Pagination, Select, Table, TableProps, Tag } from 'antd';
import { Search } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoMdAttach } from 'react-icons/io';
import { LuEye } from 'react-icons/lu';
import OrderDetails from './OrderDetails';
import UpdateStatus from './UpdateStatus';

const OrdersContainer = () => {
    const [page, setPage] = useState(1);
    const limit = 10
    const [searchText, setSearchText] = useState("");
    const query: any = { page, limit, searchTerm: searchText };
    const [status, setStatus] = useState<string>("");
    if (status) {
        query.status = status
    }
    const { isLoading, data, isFetching } = useAllOrdersQuery(query);

    const [orderDetails, setOrderDetails] = useState<null | IOrder>(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);

    const handleDropDown = (e: any, data: IOrder) => {
        if (e.key == "1") {
            setOrderDetails(data);
            setStatusUpdateOpen(true)
        }
        if (e.key == "2") {
            setOrderDetails(data);
            setViewOpen(true)
        }
    }

    const columns: TableProps<IOrder>["columns"] = [
        {
            title: "#SL",
            dataIndex: "serial",
            width: "50px",
            render: (_, __, indx) => indx + 1 + (page - 1) * limit
        },

        {
            title: "Tran. Id",
            dataIndex: ["payment", "transactionId"],
        },
        {
            title: "Service",
            dataIndex: ["service", "name"],
        },
        {
            title: "User",
            dataIndex: ["user", "first_name"],
            render: (text, record) => (
                <div className="flex items-center gap-x-1">
                    <Image
                        src={record?.user?.picture?.url || "/empty-user.png"}
                        alt="profile-picture"
                        width={40}
                        height={40}
                        className="size-7 rounded-full"
                    ></Image>
                    <p className='line-clamp-1'>{text + " " + (record?.user?.last_name ?? "") + ` (${record?.user?.phone})`}</p>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: ["status"],
            render: (value) => <Tag color={value == "PENDING" ? "gold" : value == "PROCESSING" ? "blue" : "green"}>{value}</Tag>
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            width: "230px",
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
                                label: 'Update Status',
                                key: '1',
                                icon: <CiEdit className=' size-4' />,
                            },
                            {
                                label: 'View Documents',
                                key: '2',
                                icon: <LuEye className='size-4' />,
                            },
                            // {
                            //     label: 'Attach Documents',
                            //     key: '3',
                            //     icon: <IoMdAttach className='size-4' />,
                            // }

                        ],
                        onClick: (e) => handleDropDown(e, record)
                    }}>
                        <Button size='small' type='primary'><HiOutlineDotsHorizontal size={20} /></Button>
                    </Dropdown>

                </div>
            ),
        },

    ];

    return (
        <div>

            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Vehicle Process Orders</h1>
                <div className="flex flex-row gap-x-2 items-center">

                    <Select
                        style={{ width: 150 }}
                        placeholder={"Filter By Status"}
                        onChange={(v) => setStatus(v)}
                        options={[
                            {
                                label: "All",
                                value: ""
                            },
                            {
                                label: "Pending",
                                value: "PENDING"
                            },
                            {
                                label: "Processing",
                                value: "PROCESSING"
                            },
                            {
                                label: "Completed",
                                value: "COMPLETED"
                            },
                        ]}
                    />

                    <Input
                        className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                        placeholder="Search..."
                        onChange={(e) => setSearchText(e?.target?.value)}
                        prefix={<Search size={20} color="var(--color-main)"></Search>}
                    ></Input>
                </div>
            </div>

            <div className="bg-white rounded-md border border-stroke">

                <Table<IOrder>
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

            {orderDetails && <OrderDetails defaultData={orderDetails} open={viewOpen} setOpen={setViewOpen} />}
            {orderDetails && <UpdateStatus defaultData={orderDetails} open={statusUpdateOpen} setOpen={setStatusUpdateOpen} />}

        </div>
    );
};

export default OrdersContainer;