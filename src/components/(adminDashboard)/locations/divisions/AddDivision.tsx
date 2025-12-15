import { useAddDivisionMutation } from '@/redux/api/locations.api';
import { Button, Form, FormProps, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { ImSpinner3 } from 'react-icons/im';
import { RiCloseLargeLine } from 'react-icons/ri';
import { toast } from 'sonner';

function AddDivision() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button size='large' type='primary' onClick={() => setOpen(true)}>Add Division</Button>
            <Modal
                open={open}
                title="Add New Division"
                footer={null}
                centered={true}
                onCancel={() => setOpen(false)}
                closeIcon={false}
                style={{
                    minWidth: "max-content",
                }}
            >
                <div className="py-6">
                    <div
                        className="w-8 h-8 bg-main-color absolute top-2 right-2 rounded-full cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine
                            size={16}
                            color="#fff"
                            className="absolute top-1/4 left-1/4"
                        />
                    </div>

                    <AddDivisionForm />

                </div>
            </Modal>
        </div>
    )
}

export default AddDivision;

type FieldType = {
    "name": string
}

const AddDivisionForm = () => {

    const [form] = Form.useForm();

    const [handleAdd, { isLoading }] = useAddDivisionMutation();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const res = await handleAdd(values).unwrap();
            toast.success('New Division added successfully');
            form.resetFields();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    }

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            form={form}
            style={{ width: "465px" }}
        >

                <Form.Item<FieldType>
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Name required" }]}
                >
                    <Input size="large" placeholder='name...' />
                </Form.Item>

            <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                Submit
            </Button>

        </Form>
    )
}