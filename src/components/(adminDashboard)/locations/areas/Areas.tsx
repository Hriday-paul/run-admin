"use client"

import { useAreasQuery, useDltAreaMutation } from '@/redux/api/locations.api';
import { IArea, IDistrict } from '@/redux/types';
import { Button, Popconfirm, Table, TableColumnsType, Tooltip } from 'antd';
import React from 'react'
import AddArea from './AddArea';
import { toast } from 'sonner';
import { AiOutlineDelete } from 'react-icons/ai';

function Areas() {
     const [DltArea] = useDltAreaMutation();
    const { data, isLoading, isFetching } = useAreasQuery({});

    const columns: TableColumnsType<IArea> = [
        {
            title: "#SL",
            dataIndex: "serial",
            render: (_, __, indx) => indx + 1
        },
        {
            title: "Area",
            dataIndex: "name",
        },
        {
            title: "District",
            dataIndex: ["district", "name"],
        },
        {
            title: "Division",
            dataIndex: ["division", "name"],
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div className="flex gap-2 ">

                    <Popconfirm
                        title="Delete the Area"
                        description={`All users, ads will lost related by this area`}
                        onConfirm={() => handleDltArea(record?.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title={"Delete Area"}>
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
    const handleDltArea = async (id: number) => {
        try {

            await DltArea({ id }).unwrap();

            toast.success(`Area deleted successfully`)

        } catch (err: any) {
            toast.error(err?.data?.message || "something went wrong, try again")
        }
    };

    return (
        <div>

            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Areas</h1>

                <AddArea />

            </div>

            <div className="bg-white rounded-md border border-stroke">

                <Table<IArea>
                    columns={columns}
                    dataSource={data?.data}
                    loading={isLoading || isFetching}
                    rowKey={(record) => record?.id}
                    scroll={{ x: "max-content" }}
                ></Table>

            </div>

        </div>
    );
}

export default Areas