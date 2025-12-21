import { useCompleteOrderMutation } from '@/redux/api/orders.api'
import { IOrder } from '@/redux/types'
import { Button, Form, FormProps, Input, Modal, Select, UploadFile } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { CloudDownload } from 'lucide-react'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { ImSpinner3 } from 'react-icons/im'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'sonner'

function CompleteOrder({ setOpen, open, defaultData }: { open: boolean, defaultData: IOrder, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <div>
            <Modal
                open={open}
                title="Complete Order"
                footer={null}
                centered={true}
                onCancel={() => setOpen(false)}
                closeIcon={false}
                style={{
                    minWidth: "max-content",
                }}
            >

               {(defaultData?.status == "COMPLETED" || defaultData?.response_list?.length  > 0) ? <></> : <AddResponseField defaultData={defaultData} />}

            </Modal>

        </div>
    )
};

type FieldType = {
    status: string,
    results: {
        name: string,
        fieldType: string,
        file: UploadFile[],
        data: string
    }[]
}

const AddResponseField = ({ defaultData }: { defaultData: IOrder }) => {

    const [handleComplete, { isLoading }] = useCompleteOrderMutation();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const formdata = new FormData();

            const textFields = values?.results?.filter(result => result?.fieldType == "Text");
            const fileFields = values?.results?.filter(result => result?.fieldType == "File");

            for (let result of fileFields) {
                formdata.append(result?.name, result?.file[0]?.originFileObj as File)
            }

            formdata.append("data", JSON.stringify({ inputs: textFields }));

            await handleComplete({ orderId: defaultData?.id, body: formdata }).unwrap();
            toast.success('Order result submited successfully');
            // form.resetFields();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    }

    return (
        <Form
            name="basic"
            initialValues={{ status: "COMPLETED", results: [{}] }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            // form={form}
            style={{ width: "465px" }}
        >

            <Form.Item<FieldType> name="status" label={"Status"}
                rules={[{ required: true, message: "Status is required" }]}
            >
                <Select
                    size="large"
                    placeholder="Select Status"
                    disabled
                    className='!w-full'
                    options={[
                        {
                            label: "Completed",
                            value: "COMPLETED"
                        }
                    ]}
                />
            </Form.Item>


            <div>
                <h3 className="text-base font-semibold mb-3">Results</h3>
                <Form.List
                    name="results"
                    rules={[]}
                >

                    {(fields, { add, remove }, { errors }) => (
                        <Form.Item>
                            {fields.map((field) => (
                                <Form.Item
                                    // label={index === 0 ? 'Days Off' : ''}
                                    required={false}
                                    noStyle
                                    key={`results-${field.key}`}
                                >
                                    <div className="flex flex-row gap-x-5">
                                        <div className="w-full">

                                            <Form.Item
                                                name={[field.name, "name"]}
                                                validateTrigger={["onChange", "onBlur"]}
                                                rules={[{ required: true, message: "Name is required" }]}
                                                label="Name"
                                            >
                                                <Input size="large" placeholder='name' />
                                            </Form.Item>


                                            <Form.Item
                                                name={[field.name, "fieldType"]}
                                                validateTrigger={["onChange", "onBlur"]}
                                                rules={[{ required: true, message: "Plsease, select a type" }]}
                                                label="Field Type"
                                            >
                                                <Select
                                                    size="large"
                                                    placeholder="Select type"
                                                    className='!w-full'
                                                    options={[{ label: "File", value: "File" }, { label: "Text", value: "Text" }]?.map(i => {
                                                        return { label: i?.label, value: i?.value }
                                                    })}
                                                />
                                            </Form.Item>


                                            <Form.Item dependencies={[["results", field.name, "fieldType"]]} noStyle>

                                                {({ getFieldValue }) => {

                                                    const fieldType = getFieldValue(["results", field.name, "fieldType"]);

                                                    return <>
                                                        {
                                                            fieldType == "File" ? <Form.Item
                                                                name={[field.name, "file"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[{ required: fieldType == "File", message: "Field is required" }]}
                                                                valuePropName="fileList"
                                                                getValueFromEvent={(e) => {
                                                                    if (Array.isArray(e)) {
                                                                        return e;
                                                                    }
                                                                    return e?.fileList;
                                                                }}
                                                            >
                                                                <Dragger
                                                                    name="files"
                                                                    maxCount={1}
                                                                    beforeUpload={() => false} // prevents automatic upload
                                                                    // accept="image/*"
                                                                    listType="picture"
                                                                    // multiple
                                                                    // multiple
                                                                    onPreview={() => { }}
                                                                    showUploadList={{
                                                                        showPreviewIcon: false,
                                                                        showRemoveIcon: true,
                                                                    }}
                                                                >
                                                                    <div className='flex flex-col justify-center'>
                                                                        <p className="ant-upload-drag-icon flex justify-center">
                                                                            <CloudDownload size={30} />
                                                                        </p>
                                                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                                        <p className="ant-upload-hint">
                                                                            Upload documents
                                                                        </p>
                                                                    </div>
                                                                </Dragger>
                                                            </Form.Item>

                                                                :

                                                                <Form.Item
                                                                    name={[field.name, "data"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[{ required: fieldType == "Text", message: "Field is required" }]}
                                                                // label="Day"
                                                                >
                                                                    <Input.TextArea rows={4} size="large" placeholder='write...' />
                                                                </Form.Item>
                                                        }

                                                    </>
                                                }}

                                            </Form.Item>



                                        </div>

                                        <Button
                                            type="primary"
                                            onClick={() => remove(field.name)}
                                            icon={<MdDeleteOutline className="dynamic-delete-button !text-danger" />}
                                            size="middle"
                                        >
                                        </Button>


                                        {/* Add button only beside the first input */}

                                    </div>
                                </Form.Item>
                            ))}
                            <Button
                                type="dashed"
                                block
                                onClick={() => add()}
                                icon={<FaPlus />}
                                iconPosition="start"
                                size="middle"
                            >
                                Add Result
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    )}
                </Form.List>
            </div>

            <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                Save
            </Button>

        </Form>
    )
}

export default CompleteOrder