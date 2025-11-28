"use client";
import { useLoginAdminMutation } from "@/redux/api/auth.api";
import { addUserDetails } from "@/redux/slices/userSlice";
import { config } from "@/utils/config";
import type { FormProps } from "antd";
import { Button, Form, Input, Flex, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ImSpinner3 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type FieldType = {
  phone: string;
  password: string;
};

const LoginForm = () => {
  const [postLogin, { isLoading }] = useLoginAdminMutation();
  const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);

  const route = useRouter();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await postLogin(values).unwrap();

      setCookie('accessToken', res?.data?.accessToken, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      setCookie('refreshToken', res?.data?.refreshToken, {
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      dispatch(addUserDetails({ name: res?.data?.user?.first_name, role: res?.data?.user?.auth?.role, profilePicture: res?.data?.user?.picture?.url || "/empty-user.png" }));

      toast.success('Signin successfully');

      route.push("/dashboard");


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
      style={{ width: "354px" }}
    >
      <h2 className="text-xl mb-1 font-medium">Login to Account!</h2>
      <h3 className="mb-4">Please enter your phone and password to continue.</h3>
      <Form.Item<FieldType>
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please input your phone" }
        ]}
      >
        <Input size="large" type="text" placeholder="01...." addonBefore="+88" />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      <Form.Item<FieldType> valuePropName="checked">
        <Flex justify="space-between" align="center">
          {/* <Checkbox>
            <p className=" font-semibold">Remember me</p>
          </Checkbox> */}
          <Link href={"/forget-password"} style={{ textDecoration: "" }}>
            <p className="font-semibold">Forgot Password?</p>
          </Link>
        </Flex>
      </Form.Item>

      <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
        Sign In
      </Button>

    </Form>
  );
};

export default LoginForm;
