"use client"

import { useAllDivisionsQuery } from '@/redux/api/locations.api';
import { IDivision } from '@/redux/types';
import { Table, TableColumnsType } from 'antd';
import React from 'react'
import AddDivision from './AddDivision';

function Divisions() {
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