"use client"
import { Checkbox, Spin } from 'antd';
import React from 'react';
import reportBg from "@/assets/image/report-bg.png"
import userImg from "@/assets/image/Ellipse 241.png"
import Image from 'next/image';
import p1 from "@/assets/image/p1.png"
import p2 from "@/assets/image/p2.png"
import p3 from "@/assets/image/p3.jpg"
import p4 from "@/assets/image/p4.png"
import { useSingleReportQuery } from '@/redux/api/report.api';
import ErrorComponent from '@/components/shared/ErrorComponent';
import moment from 'moment';

const ReportDetails = ({ reportId }: { reportId: string }) => {
    const { isLoading, isError, isSuccess, data } = useSingleReportQuery({ reportId });

    if (isLoading) {
        return <Spin spinning={isLoading} size='default' />
    }
    if (isError) {
        return <ErrorComponent />
    }


    return (
        <div>
            {isSuccess && <div className='flex flex-row gap-5 flex-wrap'>

                {/* ------------------profile section--------------- */}
                <div>
                    <div className="border border-main-color flex items-center justify-center rounded-2xl p-3">

                        <div className="w-full max-w-sm overflow-hidden rounded-xl ">
                            {/* Header Image Section */}
                            <div className="relative h-48 bg-gray-200 mb-8">
                                <Image src={data?.data?.product?.store?.cover_photo || reportBg} height={500} width={1000} alt='store bg' className="w-full h-full object-cover" />
                                <Image src={data?.data?.product?.store?.photo || "/empty-user.png"} height={800} width={800} alt='store photo' className="w-20 h-20 mx-auto object-cover rounded-full -mt-10" />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                {/* Reported By and Shop Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-main-color font-medium text-sm mb-1">Reported By</h3>
                                        <p className="text-gray-700 text-sm">{data?.data?.user?.first_name + (data?.data?.user?.last_name ?? "")}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-main-color font-medium text-sm mb-1">Shop Reporting</h3>
                                        <p className="text-gray-700 text-sm">{data?.data?.product?.store?.name}</p>
                                    </div>
                                </div>

                                {/* Date and Reason */}
                                <div>
                                    <h3 className="text-main-color font-medium text-sm mb-1">Date</h3>
                                    <p className="text-gray-700 text-sm">{moment(data?.data?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
                                </div>

                                <div>
                                    <h3 className="text-main-color font-medium text-sm mb-1">Reason For Report</h3>
                                    <p className="text-gray-700 text-sm">{data?.data?.reason}</p>
                                </div>

                                {/* Status Section */}
                                {/* <div>
                                    <h3 className="text-main-color font-medium text-sm">Status</h3>
                                    <div className="space-y-2">
                                        <Checkbox>Resolve</Checkbox>
                                        <Checkbox>Block User</Checkbox>
                                        <Checkbox>Remove Post</Checkbox>
                                    </div>
                                </div>

                             
                                <button className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                                    Mark As Resolved
                                </button> */}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ----------------------------- product details--------------------- */}
                <div className="w-full max-w-2xl bg-white rounded-2xl border border-main-color p-6">
                    {/* Header Section */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-100 flex-shrink-0">
                            <Image src={data?.data?.product?.store?.photo || "/empty-user.png"} alt="Product user" className="w-full h-full object-cover" height={800} width={800} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-main-color">{data?.data?.product?.title}</h1>
                            <div className="flex items-center space-x-1 text-sm text-main-color">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{data?.data?.product?.store?.address || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-main-color leading-relaxed mb-6">
                        {data?.data?.product?.details}
                    </p>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {
                            data?.data?.product?.images?.map((item, indx) => {
                                return <Image key={indx} src={item} height={1000} width={1000} alt='product image' className='h-full w-full object-cover' />
                            })
                        }
                    </div>
                </div>


            </div>}
        </div>
    );
};

export default ReportDetails;