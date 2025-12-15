"use client"

import { useAreasQuery } from '@/redux/api/locations.api';
import { IArea, IDistrict } from '@/redux/types';
import { Table, TableColumnsType } from 'antd';
import React from 'react'
import AddArea from './AddArea';

function Areas() {
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

        // {
        //   title: "Action",
        //   dataIndex: "action",
        //   render: (_, record) => (
        //     <div className="flex gap-2 ">

        //       <Popconfirm
        //         title="Delete the Division"
        //         description={`Are you sure to delete this division?`}
        //         onConfirm={() => handleBlockUser(record?.id, !record?.auth?.status)}
        //         okText="Yes"
        //         cancelText="No"
        //       >
        //         <Tooltip title={record?.auth?.status ? "Block" : "Unblock"}>
        //           <button>
        //             {record?.auth?.status ? <MdBlockFlipped size={22} color="green" /> : <CgUnblock size={22} color="#CD0335" />}
        //           </button>
        //         </Tooltip>
        //       </Popconfirm>




        //     </div>
        //   ),
        // },
    ];

    // Block user handler
    //   const handleDltDivision = async (id: number, status: boolean) => {
    //     try {
    //       if (status) {
    //         await handleStatusUpdate({ userId: id, status }).unwrap();
    //       } else {
    //         await handleStatusUpdate({ userId: id, status }).unwrap();
    //       }

    //       toast.success(`Vendor ${status ? "unblock" : "block"} successfully`)

    //     } catch (err: any) {
    //       toast.error(err?.data?.message || "something went wrong, try again")
    //     }
    //   };

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