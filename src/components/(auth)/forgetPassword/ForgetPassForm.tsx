"use client";
import { useForgotPasswordMutation } from "@/redux/api/auth.api";
import { config } from "@/utils/config";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

type FieldType = {
  phone: string;
};

const ForgetPassForm = () => {
  const [postApi, { isLoading }] = useForgotPasswordMutation();
  const route = useRouter();
  const [_, setCookie] = useCookies(['token']);

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await postApi(values).unwrap();

      setCookie('token', res?.data?.token, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      toast.success('Otp send to your email');

      route.push("/verify-otp");

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
      <h1 className="text-2xl text-text-color font-semibold text-center mt-8 mb-5">Forgot Password</h1>
      <p className="text-sm text-text-color text-center mb-8">Please enter your phone number to reset your password</p>

      <Form.Item<FieldType>
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please input your phone" }
        ]}
      >
        <Input size="large" type="text" placeholder="01...." addonBefore="+88" />
      </Form.Item>

      <Button disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end" type="primary" htmlType="submit" size="large" block>
        Submit
      </Button>

    </Form>
  );
};

export default ForgetPassForm;
