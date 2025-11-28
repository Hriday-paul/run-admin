import { useAllDivisionsQuery, useDistrictsByDivisionQuery } from '@/redux/api/locations.api';
import { useAddVendorMutation } from '@/redux/api/users.api';
import { Button, Form, FormProps, Input, InputNumber, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { ImSpinner3 } from 'react-icons/im';
import { RiCloseLargeLine } from 'react-icons/ri';
import { toast } from 'sonner';

function AddVendor() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button size='large' type='primary' onClick={() => setOpen(true)}>Add Vendor</Button>
            <Modal
                open={open}
                title="Add New Vendor"
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

                    <AddVendorForm />

                </div>
            </Modal>
        </div>
    )
}

export default AddVendor;

type FieldType = {
    "email": string | null,
    phone: string,
    first_name: string,
    last_name: string | null,
    whatsapp: string | null
    picture: null
    password: string

    address: string | null,

    division: string | null,
    district: string | null,
    upzilla: string | null,

    facebook: string | null
    twitter: string | null,
    youtube: string | null,
    instagram: string | null
    linkedin: string | null
}

const AddVendorForm = () => {

    const [form] = Form.useForm();

    const [handleAdVendor, { isLoading }] = useAddVendorMutation();

    const { isLoading: divisionloading, data, isSuccess, } = useAllDivisionsQuery();
    const [division, setDivision] = useState<any>(null);
    const { isLoading: districtLoad, isFetching: districtFetch, data: districts, isSuccess: districtSuccess } = useDistrictsByDivisionQuery({ divisionId: division ? division?.id : 1 });

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const res = await handleAdVendor(values).unwrap();
            toast.success('New vendor added successfully');
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
            <div className='grid grid-cols-2 gap-5'>
                <Form.Item<FieldType>
                    name="first_name"
                    label="First Name"
                    rules={[{ required: true, message: "First Name required" }]}
                >
                    <Input size="large" placeholder='First name...' />
                </Form.Item>
                <Form.Item<FieldType>
                    name="last_name"
                    label="Last Name"
                // rules={[{ required: true, message: "First Name required" }]}
                >
                    <Input size="large" placeholder='Last name...' />
                </Form.Item>
            </div>

            <Form.Item<FieldType>
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Phone number required" }]}
            >
                <Input size="large" type='number' placeholder='01...' addonBefore="+88" className='w-full' />
            </Form.Item>

            <Form.Item<FieldType>
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password size="large" placeholder="Password" />
            </Form.Item>

            <div className='grid grid-cols-2 gap-5'>
                <Form.Item<FieldType>
                    name="email"
                    label="Email"
                // rules={[{ required: true, message: "Phone number required" }]}
                >
                    <Input size="large" type='email' placeholder='xyz@gmail.com' />
                </Form.Item>
                <Form.Item<FieldType>
                    name="address"
                    label="Addres"
                // rules={[{ required: true, message: "Phone number required" }]}
                >
                    <Input size="large" placeholder='Write address' />
                </Form.Item>
            </div>

            <div className='grid grid-cols-2 gap-x-5'>
                <Form.Item<FieldType> name="division" label={"Division"}
                // rules={[{ required: true, message: "Pet Gender is required" }]}
                >
                    <Select
                        // defaultValue="lucy"
                        // style={{ width: 120 }}
                        // onChange={handleChange}
                        size="large"
                        placeholder="Select Division"
                        className='!w-full'
                        onChange={(e) => {
                            setDivision(data?.data?.divisions?.find(i => i?.name == e))
                            form.setFieldsValue({ district: null })
                        }}
                        loading={divisionloading}
                        options={isSuccess ? data?.data?.divisions?.map(i => {
                            return { label: i?.name, value: i?.name }
                        }) : []}
                    />
                </Form.Item>
                <Form.Item<FieldType> name="district" label={"District"}
                // rules={[{ required: true, message: "Pet Gender is required" }]}
                >
                    <Select
                        // defaultValue="lucy"
                        // style={{ width: 120 }}
                        // onChange={handleChange}
                        size="large"
                        placeholder="Select District"
                        className='!w-full'
                        loading={districtLoad || districtFetch}
                        options={districtSuccess ? districts?.data?.map(i => {
                            return { label: i?.name, value: i?.name }
                        }) : []}
                    />
                </Form.Item>
            </div>

            <div className='grid grid-cols-2 gap-5'>
                <Form.Item<FieldType>
                    name="facebook"
                    label="Facebook"
                // rules={[{ required: true, message: "Phone number required" }]}
                >
                    <Input size="large" placeholder='https://facebook.com' />
                </Form.Item>
                <Form.Item<FieldType>
                    name="whatsapp"
                    label="Whatsapp"
                // rules={[{ required: true, message: "Phone number required" }]}
                >
                    <Input size="large" placeholder='01......' />
                </Form.Item>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                <Form.Item<FieldType>
                    name="twitter"
                    label="Twitter"
                // rules={[{ required: true, message: "Phone number required" }]}
                >
                    <Input size="large" placeholder='https://twitter.com' />
                </Form.Item>
                <Form.Item<FieldType>
                    name="instagram"
                    label="Instagram"
                // rules={[{ required: true, message: "Phone number required" }]}
                >
                    <Input size="large" placeholder='https://instagram.com' />
                </Form.Item>
            </div>

            <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                Submit
            </Button>

        </Form>
    )
}