"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Productcard from './Productcard';
import bannerMg from "@/assets/image/user_banner.png"
import { useStoreDetailsQuery, useStoreProductsQuery } from '@/redux/api/store.api';
import ErrorComponent from '@/components/shared/ErrorComponent';
import { Empty, Pagination, Spin } from 'antd';

const UserDetails = ({ storeId }: { storeId: string }) => {
    return (
        <div className='bg-white p-5 rounded'>
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>

                {/* -------------------user details-------------- */}
                <div className='col-span-1 border border-main-color rounded-lg p-5'>
                    <StoreDetails storeId={storeId} />
                </div>


                <div className='col-span-1 lg:col-span-2 border border-main-color rounded-lg p-5'>
                    <StoreProducts storeId={storeId} />
                </div>

            </div>
        </div>
    );
};

export default UserDetails;


const StoreDetails = ({ storeId }: { storeId: string }) => {
    const { isLoading, isSuccess, isError, data } = useStoreDetailsQuery({ id: storeId });

    if (isLoading) {
        return <Spin spinning={isLoading} />
    }

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div className="bg-white rounded-2xl w-full max-w-sm relative  mx-auto">

            <div>
                <Image src={data?.data?.cover_photo || bannerMg} alt='user banner image' height={1000} width={5000} className='h-36 w-full object-cover'/>

                {/* Profile Section */}
                <div className="text-center mb-5 -mt-12">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                        <Image src={data?.data?.photo || "/empty-user.png"} alt="store photo" className="w-full h-full object-cover rounded-full" height={500} width={500} />
                    </div>
                    <h1 className="text-xl font-medium text-gray-900">{data?.data?.name}</h1>
                </div>
            </div>

            {/* Personal Details Section */}
            <div className="border border-stroke rounded-xl p-5">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Store Details</h2>

                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-500">Store Name:</span>
                        <span className="text-gray-900 font-medium">{data?.data?.name}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-500">Location:</span>
                        <span className="text-gray-900 font-medium">{data?.data?.address || "N/A"}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-500">Times:</span>
                        <span className="text-gray-900 font-medium">{data?.data?.open_time || "N/A"}</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-500">Status:</span>
                        <span className="text-gray-900 font-medium">{data?.data?.status}</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-500">User:</span>
                        <span className="text-gray-900 font-medium">{data?.data?.user?.first_name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StoreProducts = ({ storeId }: { storeId: string }) => {
    const [page, setPage] = useState(1);
    const limit = 10
    const { isLoading, isSuccess, isError, data } = useStoreProductsQuery({ storeId, page });

    if (isLoading) {
        return <Spin spinning={isLoading} />
    }

    if (isError) {
        return <ErrorComponent />
    }

    return <>
        <h2 className='text-xl font-semibold pb-5'>Products</h2>
        {isSuccess && data?.data?.data?.length <= 0 && <Empty />}
        <div className=' flex flex-row gap-5 flex-wrap'>
            {
                isSuccess && data?.data?.data?.map(prod => {
                    return <Productcard productData={prod}/>
                })
            }
        </div>

        <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
    </>

}