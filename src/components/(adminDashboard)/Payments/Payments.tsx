"use client";
import {
    Input,
    Pagination,
    Select,
    Table,
    TableColumnsType,
    Tag,
} from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import moment from "moment";
import { TPayment } from "@/redux/types";
import { useAllPaymentsQuery } from "@/redux/api/payments.api";

const PaymentList = () => {
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10
    const query : any = { searchTerm: searchText, limit: 10, page }
    const [type, setType] = useState<string>("");
    if(type){
        query.type = type
    }
    const { data, isLoading, isFetching } = useAllPaymentsQuery(query);

    const columns: TableColumnsType<TPayment> = [
        {
            title: "#SL",
            dataIndex: "serial",
            render: (_, __, indx) => indx + 1 + (page - 1) * limit
        },
        {
            title: "Tran. Id",
            dataIndex: ["transactionId"],
        },
        {
            title: "User Name",
            dataIndex: ["user", "first_name"],
            render: (value, record) => `${value} (${record?.user?.phone})`
        },
        {
            title: "Type",
            dataIndex: ["type"],
            render: (value) => <Tag color={value == "vehicle_process" ? "green" : "default"}>{value}</Tag>
        },
        {
            title: "Package/Vehicle/Document",
            dataIndex: ["type"],
            render: (value, record) => `${record?.subscription ? record?.subscription?.package?.name : record?.order ? record?.order?.service?.name : "N/A"}`
        },
        {
            title: "Amount",
            dataIndex: ["amount"],
        },
        {
            title: "Receive payment",
            dataIndex: ["paid_amount"],
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
        }
    ];

    return (
        <>
            <div>

                <div className="flex justify-between items-center p-5 rounded-t-xl">
                    <h1 className="  text-xl text-text-color font-semibold">Payments</h1>
                    <div className="flex flex-row gap-x-2 items-center">

                        <Select
                            style={{ width: 150 }}
                            placeholder={"Filter By Category"}
                            onChange={(v) => setType(v)}
                            options={[
                                {
                                    label: "All",
                                    value: ""
                                },
                                {
                                    label: "Subscription",
                                    value: "subscription"
                                },
                                {
                                    label: "Vehicle Process",
                                    value: "vehicle_process"
                                },
                                {
                                    label: "Document Download",
                                    value: "document_download"
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

                    <Table<TPayment>
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
        </>
    );
};


export default PaymentList