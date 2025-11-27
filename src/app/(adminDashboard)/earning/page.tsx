import EarningTable from '@/components/(adminDashboard)/earning/EarningTable';
import { ArrowRightLeft } from 'lucide-react';
import React from 'react';

const earningStats = [
    {
        key: "today",
        title: "Today's Earning",
        amount: 4005,
    },

    {
        key: "total",
        title: "All Earnings",
        amount: 345452,
    },
];

const EarningPage = () => {
    return (
        <div>
            <div className="bg-section-bg rounded-md shadow-md">
                <div className="flex justify-between items-center px-10 py-5 bg-main-color rounded-t-xl">
                    <h1 className="  text-2xl text-white font-extrabold">Earning</h1>
                </div>
            </div>

            {/* Earning stats */}
            <section className="mt-5 justify-center flex flex-row flex-wrap gap-5">
                {earningStats?.map((stat) => (
                    <div
                        key={stat.key}
                        className={"flex flex-row justify-between items-center gap-x-10 rounded-lg px-5 py-4 text-lg bg-main-color text-white "}
                    >
                        <ArrowRightLeft size={24} />

                        <span>{stat.title}</span>
                        <span className="pl-1 lg:pl-3 text-xl font-semibold">$ {stat.amount}</span>

                    </div>
                ))}
            </section>

            <div className='p-5'>
                <EarningTable />
            </div>


        </div>
    );
};

export default EarningPage;