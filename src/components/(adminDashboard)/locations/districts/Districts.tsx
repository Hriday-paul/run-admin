"use client"

import { useDistrictsQuery, useDltDistrictMutation } from '@/redux/api/locations.api';
import { IDistrict } from '@/redux/types';
import { Button, Popconfirm, Table, TableColumnsType, Tooltip } from 'antd';
import React from 'react'
import AddDistrict from './AddDistrict';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'sonner';

function Districts() {
     const [DltDis] = useDltDistrictMutation();
    const { data, isLoading, isFetching } = useDistrictsQuery();

    const columns: TableColumnsType<IDistrict> = [
        {
            title: "#SL",
            dataIndex: "serial",
            render: (_, __, indx) => indx + 1
        },
        {
            title: "District",
            dataIndex: "name",
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
                        title="Delete the District"
                        description={`All users, ads, areas will lost related by this district`}
                        onConfirm={() => handleDltDistrict(record?.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title={"Delete District"}>
                            <Button size='small' type='default'>
                                <AiOutlineDelete />
                            </Button>
                        </Tooltip>
                    </Popconfirm>

                </div>
            ),
        },
    ];

    // dlt handler
    const handleDltDistrict = async (id: number) => {
        try {

            await DltDis({ id }).unwrap();

            toast.success(`District deleted successfully`)

        } catch (err: any) {
            toast.error(err?.data?.message || "something went wrong, try again")
        }
    };

    return (
        <div>

            <div className="flex justify-between items-center p-5 rounded-t-xl">
                <h1 className="  text-xl text-text-color font-semibold">Districts</h1>

                <AddDistrict />

            </div>

            <div className="bg-white rounded-md border border-stroke">

                <Table<IDistrict>
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

export default Districts