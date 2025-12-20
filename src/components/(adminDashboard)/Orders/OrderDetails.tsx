"use client"
import { FieldType, IOrder } from '@/redux/types';
import { Button, Empty, Modal } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BsCloudDownload } from 'react-icons/bs';
import { FaFileAlt } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const OrderDetails = ({ defaultData, setOpen, open }: { defaultData: IOrder, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    return (
        <div>
            <Modal
                open={open}
                footer={null}
                // centered={true}
                onCancel={() => setOpen(false)}
                title="Attachments"
            // closeIcon={false}
            >

                <div className='space-y-5 w-full'>
                    {
                        defaultData?.fields?.map(report => {
                            return <div className='p-10 border border-gray-200 rounded flex flex-col justify-center relative' key={report?.id}>
                                {report?.fieldType == FieldType.File ? <FaFileAlt className='text-5xl' /> : <></>}
                                <p className="mt-2.5">
                                    {report?.requirement?.name}
                                </p>
                                {
                                    report?.fieldType == FieldType.Text && <p className='text-lg font-medium mt-1'>{report?.data}</p>
                                }
                                {(report?.fieldType == FieldType.File && report?.File) && <div className='flex flex-row gap-x-2 items-center absolute right-5 top-5'>
                                    <Link href={report?.File?.url} target='_blank'>
                                        <Button size='small'>
                                            <MdOutlineRemoveRedEye />
                                        </Button>
                                    </Link>
                                    <a href={report?.File?.url} download={true}>
                                        <Button size='small'>
                                            <BsCloudDownload />
                                        </Button>
                                    </a>
                                </div>}
                            </div>
                        })
                    }
                    {/* Other files----- */}
                    <div className='p-5 border border-gray-200 rounded flex flex-col justify-center relative'>

                        <p className="text-lg font-medium mb-2">
                            Other Files
                        </p>
                        <div className='flex flex-row gap-5 flex-wrap'>
                            {
                                defaultData?.otherFiles?.map(file => {
                                    return (
                                        <div className='p-5 border border-gray-200 rounded flex flex-col justify-center relative' key={file?.File?.key}>

                                            <FaFileAlt className='text-6xl' />

                                            <div className='flex flex-row gap-x-1 items-center mt-2.5 justify-center'>
                                                <Link href={file?.File?.url} target='_blank'>
                                                    <Button size='small'>
                                                        <MdOutlineRemoveRedEye />
                                                    </Button>
                                                </Link>
                                                <a href={file?.File?.url} download={true}>
                                                    <Button size='small'>
                                                        <BsCloudDownload />
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/* ---------message----------- */}
                    <div className='p-10 border border-gray-200 rounded flex flex-col justify-center relative'>

                        <p className="mt-2.5">
                            Message
                        </p>

                        <p className='text-base mt-1'>{defaultData?.message || "N/A"}</p>
                    </div>


                </div>

                {defaultData?.fields?.length == 0 && <div className='min-h-60 flex justify-center items-center'>
                    <Empty />
                </div>}

            </Modal>
        </div>
    );
};

export default OrderDetails;