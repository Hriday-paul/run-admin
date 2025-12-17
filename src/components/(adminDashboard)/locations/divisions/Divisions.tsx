"use client"

import { useAllDivisionsQuery, useDltDivisionMutation } from '@/redux/api/locations.api';
import { IDivision } from '@/redux/types';
import { Button, Popconfirm, Table, TableColumnsType, Tooltip } from 'antd';
import React from 'react'
import AddDivision from './AddDivision';
import { toast } from 'sonner';
import { AiOutlineDelete } from "react-icons/ai";

function Divisions() {
    const [DltDiv] = useDltDivisionMutation();
    const { data, isLoading, isFetching } = useAllDivisionsQuery();

    const columns: TableColumnsType<IDivision> = [
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
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div className="flex gap-2 ">

                    <Popconfirm
                        title="Delete the Division"
                        description={`All users, ads, areas, districts will lost related by this division`}
                        onConfirm={() => handleDltDivision(record?.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title={"Delete Division"}>
                            <Button size='small' type='default'>
                                <AiOutlineDelete />
                            </Button>
                        </Tooltip>
                    </Popconfirm>

                </div>
            ),
        },
    ];

    // Block user handler
    const handleDltDivision = async (id: number) => {
        try {

            await DltDiv({ id }).unwrap();

            toast.success(`Division deleted successfully`)

        } catch (err: any) {
            toast.error(err?.data?.message || "something went wrong, try again")
        }
    };

    return (
        <div>

            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Divisions</h1>

                <AddDivision />

            </div>

            <div className="bg-white rounded-md border border-stroke">

                <Table<IDivision>
                    columns={columns}
                    dataSource={data?.data?.divisions}
                    loading={isLoading || isFetching}
                    rowKey={(record) => record?.id}
                    scroll={{ x: "max-content" }}
                ></Table>

            </div>

        </div>
    );
}

export default Divisions