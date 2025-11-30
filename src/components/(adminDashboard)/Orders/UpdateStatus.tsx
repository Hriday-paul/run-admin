import { useUpdateOrderStatusMutation } from '@/redux/api/orders.api'
import { IOrder } from '@/redux/types'
import { Button, Form, FormProps, Modal, Select } from 'antd'
import React, { useEffect } from 'react'
import { ImSpinner3 } from 'react-icons/im'
import { RiCloseLargeLine } from 'react-icons/ri'
import { toast } from 'sonner'

type FieldType = {
    status: string
}

function UpdateStatus({ setOpen, open, defaultData }: { open: boolean, defaultData: IOrder, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [form] = Form.useForm();
    const [handleUpdate, { isLoading}] = useUpdateOrderStatusMutation();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const res = await handleUpdate({ orderId: defaultData?.id, status: values?.status }).unwrap();
            toast.success('Order status updated successfully');
            form.resetFields();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    }

    useEffect(() => {
        form.setFieldsValue({
            status: defaultData?.status
        })
    }, [defaultData])

    return (
        <div>
            <Modal
                open={open}
                title="Update Status"
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

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        form={form}
                        style={{ width: "465px" }}
                    >

                        <Form.Item<FieldType> name="status" label={"Status"}
                            rules={[{ required: true, message: "Status is required" }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select Status"
                                className='!w-full'
                                options={[
                                    {
                                        label: "Pending",
                                        value: "PENDING"
                                    },
                                    {
                                        label: "Processing",
                                        value: "PROCESSING"
                                    },
                                    {
                                        label: "Completed",
                                        value: "COMPLETED"
                                    },
                                ]}
                            />
                        </Form.Item>

                        <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                            Save
                        </Button>

                    </Form>

                </div>
            </Modal>
        </div>
    )
}

export default UpdateStatus