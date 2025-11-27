import { Metadata } from "next";
import LoginForm from "@/components/(auth)/login/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for RunBd.",
};

const LoginPage = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center min-h-screen'>
      <div className='min-h-screen lg:h-auto w-full flex justify-center items-center bg-red-white'>

        <div className="bg-white rounded-lg p-8 border border-stroke shadow-md">
          <LoginForm />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
