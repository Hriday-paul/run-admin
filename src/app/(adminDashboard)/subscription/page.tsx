import SubscriptionContainer from '@/components/(adminDashboard)/Subscription/SubscriptionContainer';
import React from 'react';

const SubscriptionPage = () => {
    return (
        <div>
            <div className="bg-section-bg rounded-md shadow-md">
                <div className="flex justify-between items-center px-10 py-5 bg-main-color rounded-t-xl">
                    <h1 className="  text-2xl text-white font-extrabold">Subscription</h1>
                </div>
            </div>

            <SubscriptionContainer />

        </div>
    );
};

export default SubscriptionPage;