import LatestUser from "@/components/(adminDashboard)/dashboard/LatestUser";
import Notifications from "@/components/(adminDashboard)/Notifications/Notifications";
import Statistic from "@/components/(adminDashboard)/dashboard/Statistic";
import UserOverviewChart from "@/components/(adminDashboard)/dashboard/UserOverviewChart";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-10 space-y-5 ">
      <Statistic></Statistic>

      <UserOverviewChart />

      <LatestUser></LatestUser>

    </div>
  );
};

export default DashboardPage;
