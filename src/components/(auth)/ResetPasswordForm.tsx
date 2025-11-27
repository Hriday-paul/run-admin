"use client";
import { useResetPasswordMutation } from "@/redux/api/auth.api";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

type FieldType = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const [postReset, { isLoading }] = useResetPasswordMutation()
  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await postReset(values).unwrap();

      toast.success('Password Reset Successfully');

      route.push("/login");

    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <h1 className="text-2xl text-text-color font-semibold text-center mt-8 mb-5">Create New Password</h1>
      <p className="text-sm text-text-color text-center mb-8">Please enter your new password for change password</p>
      <Form.Item<FieldType>
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: "Please your set password!" }]}
      >
        <Input.Password size="large" placeholder="Set your password" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Re-enter password" />
      </Form.Item>

      <Button disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end" type="primary" htmlType="submit" size="large" block>
        Submit
      </Button>

    </Form>
  );
};

export default ResetPasswordForm;
