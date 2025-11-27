"use client"
import { ConfigProvider, Table, TableProps } from 'antd';
import { Eye } from 'lucide-react';
import React, { useState } from 'react';
import EarningDetails from './EarningDetails';

type TDataType = {
    key?: number;
    tranId: string;
    account: string;
    date: string;
    amount: number;
};
const data: TDataType[] = Array.from({ length: 20 }).map((data, inx) => ({
    key: inx,
    tranId: "#H45RP0",
    account: "8335324348",
    amount: 500,
    date: "11 April, 2025",
}));

const EarningTable = () => {

    const [open, setOpen] = useState(false)

    const columns: TableProps<TDataType>["columns"] = [
        {
            title: "Tran Id",
            dataIndex: "tranId",
        },
        {
            title: "Account",
            dataIndex: "account"
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: () => (
                <div className="flex gap-2 ">
                    <button onClick={() => setOpen(!open)}>
                        <Eye
                            size={22}
                            color="var(--color-text-color)"
                        />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <ConfigProvider theme={{
                components: {
                    Table: {
                        headerBg: "var(--color-section-bg)",
                        headerColor: "var(--color-text-color)",
                        borderColor: "#E4E1E3",
                        headerSplitColor: "#E4E1E3",
                    }
                }
            }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 8 }}
                    scroll={{ x: "max-content" }}
                ></Table>
            </ConfigProvider>

            <EarningDetails open={open} setOpen={setOpen} />
        </div>
    );
};

export default EarningTable;