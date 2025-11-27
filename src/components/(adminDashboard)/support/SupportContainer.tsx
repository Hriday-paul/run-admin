"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, FormProps, Input, Modal, Pagination, Table, TableColumnsType, Tag } from 'antd';
import { useAllContactsQuery, useReplyContactsMutation } from '@/redux/api/contact.api';
import { Eye, Search } from 'lucide-react';
import { Icontact } from '@/redux/types';
import moment from 'moment';
import { RiCloseLargeLine } from 'react-icons/ri';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'sonner';

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
            title: "Status",
            dataIndex: "isReplied",
            render(value) {
                return <Tag color={value ? "green" : "yellow"}>{value ? "Replied" : "Not Replied"}</Tag>
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
        <div className="bg-section-bg rounded-md shadow-md border border-main-color">
            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Support messages</h1>

                <Input
                    className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                    placeholder="Search..."
                    onChange={(e) => setSearchText(e?.target?.value)}
                    prefix={<Search size={20} color="var(--color-main)"></Search>}
                ></Input>

            </div>

            <div className="">

                <Table<Icontact>
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

type FieldType = {
    message: string,
}

const MessageView = ({ contact }: { contact: Icontact }) => {
    const [handlereplyApi, {isLoading}] = useReplyContactsMutation();

    const [form] = Form.useForm<FieldType>();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const res = await handlereplyApi({id : contact?._id, body: values}).unwrap();
            toast.success('Replied successfully');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    }

    useEffect(() => {
        form.setFieldsValue({
            message: contact?.reply_message || "",
        });
    }, [contact])

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            style={{ width: "465px" }}
        >

            <div className='px-5 py-4 border border-gray-300 rounded-md mb-5'>
                <p>{contact?.description}</p>
            </div>

            <Form.Item<FieldType>
                name="message"
                label="Reply Message"
                rules={[{ required: true, message: "Reply message required" }]}
            >
                <Input.TextArea size="large" rows={4} disabled={contact?.isReplied} />
            </Form.Item>

            <Button disabled={isLoading || contact?.isReplied} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                Submit
            </Button>

        </Form>
    )
}