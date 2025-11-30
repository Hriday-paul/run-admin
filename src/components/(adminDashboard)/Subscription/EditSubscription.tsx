import { Button } from 'antd';
import React, { useState } from 'react';
import { Form, FormProps, Input, InputNumber, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from 'sonner';
import { ImSpinner3 } from 'react-icons/im';
import { Package } from '@/redux/types';
import { useUpdatePackageMutation } from '@/redux/api/Package.api';

interface FieldType extends Package { };

const EditSubscription = ({ defaultValue }: { defaultValue: Package }) => {

    const [handleApiupdateSubscription, { isLoading }] = useUpdatePackageMutation()

    const [open, setOpen] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await handleApiupdateSubscription({ body: values, id: defaultValue?.id }).unwrap();
            toast.success("Plan updated successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-2xl text-lg duration-200">
                Edit
            </button>

            <Modal
                open={open}
                footer={null}
                centered={true}
                onCancel={() => setOpen(false)}
                closeIcon={false}>

                <div className="">

                    <div className="flex justify-end items-center">
                        <div
                            className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <RiCloseLargeLine size={18} color="#fff" className="" />
                        </div>
                    </div>

                    <h4 className="text-center text-xl font-medium">{"Edit Plan"}</h4>

                    <Form
                        name="basic"
                        style={{ width: '100%' }}
                        initialValues={defaultValue}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >

                        <Form.Item<FieldType> name="name" label={"Plan Name"} rules={[{ required: true, message: "Plan Name is required" }]}>
                            <Input size="large" placeholder="Plan Name" />
                        </Form.Item>

                        <Form.Item<FieldType> name="price" label={"Plan Price"} rules={[{ required: true, message: "Plan Price is required" }]}>
                            <InputNumber min={0} className='!w-full' size="large" placeholder="Plan Price" />
                        </Form.Item>

                        <Form.Item<FieldType> name="discount" label={"Discount"}>
                            <Input size="large" placeholder="30% off" />
                        </Form.Item>

                        <Form.Item<FieldType> name="duration" label={"Timeline"} rules={[{ required: true, message: "Timeline is required" }]}>
                            <InputNumber min={0} className='!w-full' size="large" placeholder="eg : 30 days" />
                        </Form.Item>

                        <Form.Item<FieldType> name="add_count" label={"Ad Limit"} rules={[{ required: true, message: "Ad limit is required" }]}>
                            <InputNumber min={0} className='!w-full' size="large" placeholder="eg : 10" />
                        </Form.Item>
                        <Form.Item<FieldType> name="feature_count" label={"Ad Featre Limit"} rules={[{ required: true, message: "Ad feature is required" }]}>
                            <InputNumber min={0} className='!w-full' size="large" placeholder="eg : 5" />
                        </Form.Item>
                        <Form.Item<FieldType> name="bumpup_count" label={"Ad Bump Limit"} rules={[{ required: true, message: "Ad bump is required" }]}>
                            <InputNumber min={0} className='!w-full' size="large" placeholder="eg : 5" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" size='large' htmlType="submit" block disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">Save</Button>
                        </Form.Item>

                    </Form>

                </div>
            </Modal>

        </>
    );
};

export default EditSubscription;