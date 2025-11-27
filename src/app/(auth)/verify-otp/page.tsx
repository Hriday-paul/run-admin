import { Metadata } from "next";
import VerifyEmailForm from "@/components/(auth)/verifyEmail/VerifyForm";

export const metadata: Metadata = {
  title: "verify otp",
};

const verifyEmail = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center min-h-screen'>
      <div className='min-h-screen lg:h-auto w-full flex justify-center items-center bg-red-white'>

        <div className="bg-white rounded-lg p-8 border border-stroke shadow-md">
          <VerifyEmailForm />
        </div>

      </div>
    </div>

  );
};

export default verifyEmail;
