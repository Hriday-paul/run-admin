import { Metadata } from "next";
import ForgetPassForm from "@/components/(auth)/forgetPassword/ForgetPassForm";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPasswordPage = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center min-h-screen'>
      <div className='min-h-screen lg:h-auto w-full flex justify-center items-center bg-red-white'>
        <div className="bg-white rounded-lg p-8 border border-stroke shadow-md">
          <ForgetPassForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
