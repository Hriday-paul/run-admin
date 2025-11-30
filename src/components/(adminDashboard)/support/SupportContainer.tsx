"use client"
import React, { useState } from 'react';
import { Button, Input, Modal, Pagination, Table, TableColumnsType } from 'antd';
import { useAllContactsQuery } from '@/redux/api/contact.api';
import { Eye, Search } from 'lucide-react';
import { Icontact } from '@/redux/types';
import moment from 'moment';
import { RiCloseLargeLine } from 'react-icons/ri';

const SupportContainer = () => {
    const [page, setPage] = useState(1);
    const limit = 10
    const [searchText, setSearchText] = useState("");
    const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
    const { data, isLoading, isFetching } = useAllContactsQuery(query);

    const [open, setOpen] = useState(false);
    const [contactData, setContactData] = useState<Icontact | null>(null)

    const columns: TableColumnsType<Icontact> = [
        {
            title: "#SL",
            dataIndex: "serial",
            render: (_, __, indx) => indx + 1 + (page - 1) * limit
        },
        {
            title: "Full Name",
            dataIndex: "firstName",
            render: (text, record) => (
                <p>{text + " " + (record?.lastName ?? "")}</p>
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
            title: "Date",
            dataIndex: "createdAt",
            render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div className="flex gap-2 ">
                    <Button size='small' onClick={() => {
                        setContactData(record)
                        setOpen(true)
                    }}>
                        <Eye
                            size={18}
                            color="var(--color-text-color)"
                        />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>

            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Contacts</h1>
                <div className="flex flex-row gap-x-2 items-center">
                    <Input
                        className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                        placeholder="Search..."
                        onChange={(e) => setSearchText(e?.target?.value)}
                        prefix={<Search size={20} color="var(--color-main)"></Search>}
                    ></Input>
                </div>
            </div>

            <div className="bg-white rounded-md border border-stroke">
                <Table<Icontact>
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



            <Modal
                open={open}
                title="Message Preview"
                footer={null}
                centered={true}
                onCancel={() => setOpen(false)}
                closeIcon={false}
                style={{
                    minWidth: "max-content",
                }}
            >
                <div className="py-6">
                    <div
                        className="w-12 h-12 bg-main-color  absolute top-2 right-2 rounded-full cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine
                            size={18}
                            color="#fff"
                            className="absolute top-1/3 left-1/3"
                        />
                    </div>

                    {contactData && <div className='w-full'><MessageView contact={contactData} /></div>}

                </div>
            </Modal>


        </div>
    );
};

export default SupportContainer;

const MessageView = ({ contact }: { contact: Icontact }) => {


    return (
        <div className='border border-stroke p-4'>
            <h4 className='text-lg font-medium'>Message</h4>
            <p className='text-sm mt-1 text-gray-900'>{contact?.description}</p>
        </div>
    )
}