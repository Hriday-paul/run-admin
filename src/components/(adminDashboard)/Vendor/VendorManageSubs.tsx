"use client"

import { useVendorAdManageMutation } from "@/redux/api/users.api";
import { AdManager, IUser } from "@/redux/types";
import { Button, DatePicker, Form, FormProps, InputNumber, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { ImSpinner3 } from "react-icons/im";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

function VendorManageSubs({ open, setOpen, defaultData }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, defaultData: IUser }) {

    return (
        <div>

            <Modal
                open={open}
                title="Manage Vendor Add"
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

                    <VendorAddManagerForm defaultData={defaultData?.addManager} userId={defaultData?.id} />

                </div>
            </Modal>
        </div>
    )
}

export default VendorManageSubs;

export interface FieldType extends AdManager { }

const VendorAddManagerForm = ({ defaultData, userId }: { defaultData: AdManager | null, userId: number }) => {
    const [form] = Form.useForm();

    const [handleManage, { isLoading }] = useVendorAdManageMutation()

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const res = await handleManage({ body: values, id: userId }).unwrap();
            toast.success('Vendor ad manage updated successfully');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    }

    useEffect(() => {
        form.setFieldsValue({
            add_count: defaultData?.add_count || 0,
            feature_count: defaultData?.feature_count || 0,
            bump_count: defaultData?.bump_count || 0,
            expiredAt: defaultData ? dayjs(defaultData?.expiredAt) : null
        })
    }, [defaultData])

    return (
        <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            style={{ width: "465px" }}>

            <Form.Item<FieldType>
                name="add_count"
                label="Ad Limit"
                rules={[{ required: true, message: "Field is required" }]}
            >
                <InputNumber size="large" placeholder='write add limit...' className="w-full" />
            </Form.Item>

            <Form.Item<FieldType>
                name="feature_count"
                label="Feature Ad Limit"
                rules={[{ required: true, message: "Field is required" }]}
            >
                <InputNumber size="large" placeholder='write feature add limit...' className="w-full" />
            </Form.Item>

            <Form.Item<FieldType>
                name="bump_count"
                label="Bump Up Ad Limit"
                rules={[{ required: true, message: "Field is required" }]}
            >
                <InputNumber size="large" placeholder='write bump up add limit...' className="w-full" />
            </Form.Item>

            <Form.Item<FieldType> name="expiredAt" label={"Expired At"} rules={[{ required: true, message: "Expired date is required" }]}>
                <DatePicker className='!w-full' size="large" placeholder="Select date" />
            </Form.Item>

            <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                Save
            </Button>

        </Form>
    )
}