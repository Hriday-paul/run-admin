import { INotification } from '@/redux/types';
import { Bell } from 'lucide-react';
import moment from 'moment';
import React from 'react';

const Notification = ({notification}:{notification : INotification}) => {
    return (
        <div className='flex flex-row gap-x-3 items-start'>
            <div className="flex justify-center bg-main-color items-center size-12 rounded cursor-pointer relative">
                {/* <IoNotificationsOutline size={24} color="#3A3C3B" /> */}
                <Bell size={20} color="#ffff" fill='#ffff' />
            </div>
            <div>
                <h1 className={`text-lg font-bold ${notification?.isRead ? "text-gray-600" : "text-black"}`}>{notification?.title}</h1>
                <p className='text-gray-700'>{notification?.message}</p>
                <p className='text-gray-600'>{moment(notification?.createdAt).format("YYYY-MM-DD hh:mm a")}</p>
            </div>
        </div>
    );
};

export default Notification;