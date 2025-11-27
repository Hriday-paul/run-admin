"use client"
import { useAllStoresQuery, useApproveStoreMutation, useRejectStoreMutation } from '@/redux/api/store.api';
import { IStore } from '@/redux/types';
import { Button, Dropdown, Input, Pagination, Spin, Table, TableColumnsType, Tag } from 'antd';
import { ArrowDownWideNarrowIcon, Eye, Search } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CiCircleCheck, CiCircleRemove, CiEdit } from 'react-icons/ci';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { toast } from 'sonner';

const StoreManagementContainer = () => {

    // const [handleStatusUpdate] = useBlock_unblockMutation();
    const [page, setPage] = useState(1);
    const limit = 10
    const [searchText, setSearchText] = useState("");
    const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
    const { data, isLoading, isFetching, isSuccess } = useAllStoresQuery(query);

    const [approveByApi, { isLoading: approveLoading }] = useApproveStoreMutation();
    const [rejectByApi, { isLoading: rejectLoading }] = useRejectStoreMutation();

    const router = useRouter();

    const handleMenuClick = async (e: any, storeId: string) => {
        if (e.key === '1') {
            await approveByApi({ storeId }).unwrap();
            toast.success("Store approved successfully")
        }
        if (e.key === '2') {
            await rejectByApi({ storeId }).unwrap();
            toast.success("Store rejected successfully")
        }
        if(e.key === "3"){
            router.push(`/store-management/products/${storeId}`)
        }
        if(e.key === "4"){
            router.push(`/store-management/${storeId}`)
        }
    };


    const columns: TableColumnsType<IStore> = [
        {
            title: "#SL",
            dataIndex: "serial",
            render: (_, __, indx) => indx + 1 + (page - 1) * limit
        },
        {
            title: "Full Name",
            dataIndex: "name",
            render: (text, record) => (
                <div className="flex items-center gap-x-1">
                    <Image
                        src={record?.photo || "/empty-user.png"}
                        className="size-10 rounded-full"
                        alt=""
                        width={40}
                        height={40}
                    ></Image>
                    <p>{text}</p>
                </div>
            ),
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Status",
            dataIndex: "status",
            //"pending" | "approved" | "rejected"
            render(value) {
                return <Tag color={value == "approved" ? "green" : value == "pending" ? "yellow" : "red"}>{value}</Tag>
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
                <Dropdown trigger={['click']}  menu={{
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
                        {
                            label: 'View Store',
                            key: '3',
                            icon: <Eye className='text-gray-900 size-4' />,
                        },
                        {
                            label: 'Update Store',
                            key: '4',
                            icon: <CiEdit className='text-gray-900 size-4' />,
                        },
                    ],
                    onClick: (e) => handleMenuClick(e, record?._id)
                }}>
                    <Button size='middle' type='primary'><HiOutlineDotsHorizontal size={20} /></Button>
                </Dropdown>
            ),
        },

    ];

    return (
        <div className="bg-section-bg rounded-md shadow-md border border-main-color">
            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Stores</h1>
                <Input
                    onChange={(e) => setSearchText(e?.target?.value)}
                    className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                    placeholder="Search store..."
                    prefix={<Search size={20} color="var(--color-main)"></Search>}
                ></Input>
            </div>

            <Spin spinning={approveLoading || rejectLoading} size='default'>
                <Table<IStore>
                    columns={columns}
                    dataSource={(isSuccess && data) ? data?.data?.data : []}
                    loading={isLoading || isFetching}
                    pagination={false}
                    rowKey={(record) => record?._id}
                    footer={() =>
                        <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
                    }
                    scroll={{ x: "max-content" }}
                ></Table>
            </Spin>

        </div>
    );
};

export default StoreManagementContainer;