"use client"
import { Button } from 'antd';
import { SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { Form, FormProps, Input, InputNumber, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdDeleteOutline } from 'react-icons/md';
import Subscriptoncard from './Subscriptoncard';

const SubscriptionContainer = () => {

    return (
        <div className='py-5 px-10 mx-auto flex flex-col justify-center max-w-5xl'>
            <AddSubscription />
            <div className='flex flex-row gap-5 flex-wrap mt-5 lg:mt-10'>
                <Subscriptoncard />
            </div>
        </div>
    );
};

export default SubscriptionContainer;

type FieldType = {
    name: string,
    price: number,
    timeline: number,
    facilities: { item: string }[]
}

const AddSubscription = () => {

    const [open, setOpen] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} type='primary' size='large' block icon={<SquarePen size={20} />} iconPosition='start'>Create Subscription Plan</Button>

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

                    <h4 className="text-center text-xl font-medium">{"Add Subscription"}</h4>

                    <Form
                        name="basic"
                        style={{ width: '100%' }}
                        initialValues={{}}
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

                        <Form.Item<FieldType> name="timeline" label={"Timeline"} rules={[{ required: true, message: "Timeline is required" }]}>
                            <InputNumber min={0} className='!w-full' size="large" placeholder="Timeline" />
                        </Form.Item>

                        <Form.List
                            name="facilities"
                            initialValue={[{ item: "" }]}
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 1) {
                                            return Promise.reject(new Error('At least 1 facilities'));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field) => (

                                        <div key={field.key} style={{ display: 'flex', gap: 8, alignItems: "center" }}>
                                            <div className='w-full'>
                                                <Form.Item
                                                    label="Facilities"
                                                    name={[field?.name, "item"]}
                                                    rules={[
                                                        { required: true, message: 'Please input facilities' },
                                                    ]}
                                                >
                                                    <Input size="large" type='' placeholder="Enter facilities" />
                                                </Form.Item>
                                            </div>

                                            {fields.length > 1 && (
                                                <Button
                                                    type="dashed"
                                                    onClick={() => remove(field.name)}
                                                    icon={<MdDeleteOutline className="dynamic-delete-button !text-danger" />}
                                                    size="middle">
                                                </Button>
                                            )}

                                        </div>


                                    ))}
                                    <Form.ErrorList errors={errors} />

                                    {/* Add button only beside the first input */}
                                    <button type='button' onClick={() => add()} className='text-base mb-5'>
                                        Add More
                                    </button>
                                </>

                            )}
                        </Form.List>


                        <Form.Item>
                            <Button type="primary" size='large' htmlType="submit" block>Save</Button>
                        </Form.Item>

                    </Form>

                </div>
            </Modal>

        </>
    );
};
