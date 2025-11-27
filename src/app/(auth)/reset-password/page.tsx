import { Metadata } from "next";
import ResetPasswordForm from "@/components/(auth)/ResetPasswordForm";


export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPassword = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center min-h-screen'>
      <div className='min-h-screen lg:h-auto w-full flex justify-center items-center bg-red-white'>

        <div className="bg-white rounded-lg p-8 border border-stroke shadow-md">
          <ResetPasswordForm />
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
