"use client";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { useUserStatsQuery } from "@/redux/api/dashboard.api";
import { HandCoins, Loader, Users } from "lucide-react";

const Statistic = () => {
  const { isLoading, isError, data } = useUserStatsQuery({}, { refetchOnMountOrArgChange: true });

  if (isError) return <ErrorComponent />

  return (
    <div className="flex justify-between items-center gap-5 flex-wrap text-text-color ">
      {/* ====================================== Total User ========================================== */}

      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-main-color text-lg font-medium">Total User</span>
            {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <span className="text-main-color text-3xl font-semibold">{data?.data?.totalUsers}</span>}
          </div>
        </div>
      </div>


      {/* ====================================== Total Vendor ========================================== */}
      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-[#3D5473] rounded-full p-4 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#3D5473] text-lg font-medium">Total Vendors</span>
            {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <span className="text-main-color text-3xl font-semibold">{data?.data?.totalVendors}</span>}
          </div>
        </div>
      </div>

      {/* ====================================== Total Pets ========================================== */}
      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
            <HandCoins className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-main-color text-lg font-medium">Total Earning</span>
            {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <span className="text-main-color text-3xl font-semibold">{data?.data?.totalEarnimgs} TK</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
