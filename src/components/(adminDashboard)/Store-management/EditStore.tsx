"use client"
import ErrorComponent from '@/components/shared/ErrorComponent';
import { useStoreDetailsQuery, useUpdateStoreMutation } from '@/redux/api/store.api';
import { IStore } from '@/redux/types';
import { Button, Form, FormProps, Input, Spin, Upload, UploadFile } from 'antd';
import { UploadFileStatus } from 'antd/es/upload/interface';
import { CloudDownload } from 'lucide-react';
import React, { useEffect } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'sonner';

const EditStore = ({ id }: { id: string }) => {
    const { isLoading, isSuccess, isError, data } = useStoreDetailsQuery({ id });
    if (isLoading) {
        return <Spin spinning={isLoading} />
    }
    if (isError) {
        return <ErrorComponent />
    }

    return <>
        {
            (isSuccess && data) && < EditStoreForm defaultData={data?.data} />
        }
    </>
}

export default EditStore;

type FieldType = {
    name: string,
    email: string,
    open_time: string,
    address: string,

    cover_photo: UploadFile[],
    photo: UploadFile[],
}

const EditStoreForm = ({ defaultData }: { defaultData: IStore }) => {

    const [form] = Form.useForm();

    const [handleUpdateStorebyApi, { isLoading }] = useUpdateStoreMutation();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        toast.success("Store Created successfully.")

        try {
            const formData = new FormData();

            formData.append("data", JSON.stringify({
                "name": values?.name,
                "open_time": values?.open_time,
                "address": values?.address,
            }))

            if (values?.cover_photo?.length > 0 && values?.cover_photo?.[0]?.originFileObj) {
                formData.append("cover_photo", values?.cover_photo?.[0]?.originFileObj as File)
            }
            if (values?.photo?.length > 0 && values?.photo?.[0]?.originFileObj) {
                formData.append("photo", values?.photo?.[0]?.originFileObj as File)
            }

            await handleUpdateStorebyApi({ storeId: defaultData?._id, body: formData })
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    useEffect(() => {
        if (defaultData) {

            const coverImage: UploadFile = {
                uid: `${Date.now()}`,
                name: `cover-photo.png`,
                status: 'done' as UploadFileStatus,
                url: defaultData?.cover_photo,
            };

            const photo: UploadFile = {
                uid: `${Date.now()}`,
                name: `photo.png`,
                status: 'done' as UploadFileStatus,
                url: defaultData?.photo,
            };

            form.setFieldsValue({ cover_photo: [coverImage], photo: [photo], name: defaultData?.name, open_time: defaultData?.open_time, address: defaultData?.address }); // sync with form field
        }
    }, [defaultData, form]);

    return (
        <div className='max-w-3xl mx-auto border border-main-color rounded-xl p-8'>
            <Form
                name="basic"
                style={{ width: '100%' }}
                initialValues={{}}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >

                <Form.Item
                    name="cover_photo"
                    label="Cover Photo"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e?.fileList;
                    }}
                    rules={[{ required: true, message: "image is required" }]}
                >
                    <Upload.Dragger
                        name="files"
                        maxCount={1}
                        beforeUpload={() => false} // prevents automatic upload
                        accept="image/*"
                        listType="picture"
                    >
                        <p className="ant-upload-drag-icon mx-auto flex justify-center">
                            <CloudDownload size={40} />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item
                    name="photo"
                    label="Photo"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e?.fileList;
                    }}
                    rules={[{ required: true, message: "image is required" }]}
                >
                    <Upload.Dragger
                        name="files"
                        maxCount={1}
                        beforeUpload={() => false} // prevents automatic upload
                        accept="image/*"
                        listType="picture"
                    >
                        <p className="ant-upload-drag-icon mx-auto flex justify-center">
                            <CloudDownload size={40} />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>


                <Form.Item<FieldType> name="name" label={"Store Name"} rules={[{ required: true, message: "Store Name is required" }]}>
                    <Input size="large" placeholder="Enter Store Name" />
                </Form.Item>

                <Form.Item<FieldType> name="open_time" label={"Open Time"} rules={[{ required: true, message: "Phone is required" }]}>
                    <Input size="large" placeholder='eg : 09:00 Am - 10:00 PM' />
                </Form.Item>

                <Form.Item<FieldType> name="address" label={"Address"} rules={[{ required: true, message: "Location is required" }]}>
                    <Input size="large" placeholder='eg: koyalalampur, Malaysiya' />
                </Form.Item>

                <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                    Save
                </Button>

            </Form>
        </div>
    );
};
