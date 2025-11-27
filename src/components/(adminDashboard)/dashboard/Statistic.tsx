"use client";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { useUserStatsQuery } from "@/redux/api/dashboard.api";
import { Loader, Users } from "lucide-react";

const Statistic = () => {
  const { isLoading, isError, data } = useUserStatsQuery({}, {refetchOnMountOrArgChange : true});

  if (isError) return <ErrorComponent />
  
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5 flex-wrap text-text-color ">

      {/* ====================================== Total user ========================================== */}
      <div className="bg-[#824902]/10 rounded-xl p-6 flex-1 w-full text-main-color">
        <div className="flex justify-center items-center gap-4">
          <div className="bg-main-color text-white p-5 rounded-full">
            <Users className="w-12 h-12" />
          </div>
          <div className="flex flex-col">
             {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <span className="text-main-color text-3xl font-semibold">{data?.data?.totalUsers || 0}</span>}
            <span className="text-lg font-medium">Total User</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistic;
