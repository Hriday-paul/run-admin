
import { CircleCheck, Trash } from 'lucide-react';
import React from 'react';
import EditSubscription from './EditSubscription';
import { Popconfirm } from 'antd';
import { toast } from 'sonner';
import { Package } from '@/redux/types';
import { useDeletePackageMutation } from '@/redux/api/Package.api';

const Subscriptoncard = ({ pack }: { pack: Package }) => {

    const [handleDeleteApi] = useDeletePackageMutation();

    const handleDelete = async (id: number) => {
        try {
            await handleDeleteApi(id).unwrap();
            toast.success("Plan Deleted Successfully");
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    }

    return (
        <div className="bg-slate-100 rounded-3xl p-8 w-full max-w-sm text-main-color border border-stroke flex flex-col">
            {/* <h2 className="text-2xl font-semibold mb-2">{pack?.title}</h2> */}
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">{pack?.name}</h2>
                <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${pack?.price}</span>
                    <span className="text-xl font-bold">/{pack?.duration} days</span>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                    <CircleCheck fill='#ffffff' color="var(--color-main)" size={24} />
                    <span className="text-lg">{pack?.add_count} Regular Ads</span>
                </div>
                <div className="flex items-center gap-3">
                    <CircleCheck fill='#ffffff' color="var(--color-main)" size={24} />
                    <span className="text-lg">{pack?.feature_count} Featured Ads</span>
                </div>
                <div className="flex items-center gap-3">
                    <CircleCheck fill='#ffffff' color="var(--color-main)" size={24} />
                    <span className="text-lg">{pack?.bumpup_count} Ads will be bumped up</span>
                </div>
            </div>

            {/* Subscribe Button */}
            <div className='flex flex-row gap-x-2 items-center mt-auto justify-end'>

                <EditSubscription defaultValue={pack} />
                <Popconfirm
                    title={`Delete Plan`}
                    description="Are you sure to dlete this plan?"
                    onConfirm={() => handleDelete(pack?.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold p-3 rounded-2xl text-lg duration-200">
                        <Trash />
                    </button>
                </Popconfirm>

            </div>
        </div>
    );
};

export default Subscriptoncard;