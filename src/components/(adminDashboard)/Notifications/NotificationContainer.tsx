"use client";
import { Button, Pagination, Spin } from "antd";
import { LoaderCircle } from "lucide-react";
import { useNotificationsQuery, useReadAllNotificationsMutation } from "@/redux/api/notification.api";
import { toast } from "sonner";
import Notification from "./Notifications";
import { useState } from "react";
import ErrorComponent from "@/components/shared/ErrorComponent";

const NotificationContainer = () => {
  const [page, setPage] = useState<number>(1);

  const [handledeleteNotificationByApi, { isLoading: dltLoading }] = useReadAllNotificationsMutation();

  const { isLoading, isError, data, isSuccess } = useNotificationsQuery({});

  const handleReadAll = async () => {
    try {
      await handledeleteNotificationByApi().unwrap();
      toast.success("All Notification read successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }

  if (isLoading) return <div className='min-h-40 flex items-center justify-center'>
    <Spin spinning={isLoading} />
  </div>

  if (isError) return <ErrorComponent />

  return (
    <div>

      <div className="flex justify-between items-center px-10 pt-5 rounded-t-xl">
        <h1 className="text-2xl text-main-color font-semibold">All Notifications</h1>
        <Button type="primary" onClick={handleReadAll}> {dltLoading ? <LoaderCircle className='text-white animate-spin' /> : "Mark Read All"}</Button>
      </div>

      <div className='space-y-8 overflow-y-auto md:p-8 lg:p-10'>
        {
          data?.data?.data?.map(i => {
            return <Notification key={i?._id} notification={i} />
          })
        }
      </div>
      {isSuccess && <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={10} align="start" showSizeChanger={false} onChange={(page) => setPage(page)} hideOnSinglePage />}
    </div>
  );
};

export default NotificationContainer;
