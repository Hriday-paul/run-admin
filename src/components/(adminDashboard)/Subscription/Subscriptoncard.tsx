import { CircleCheck } from 'lucide-react';
import React from 'react';

const Subscriptoncard = () => {
    return (
        <div className="bg-main-color rounded-3xl p-8 w-full max-w-sm text-white">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Standard</h2>
                <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-xl font-bold">/mo</span>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
                {["Feature 1", "Feature 2", "Feature 3", "Feature 4"].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <CircleCheck fill='#ffffff' color="var(--color-main)" size={24} />
                        <span className="text-lg">{feature}</span>
                    </div>
                ))}
            </div>

            {/* Subscribe Button */}
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-2xl text-lg duration-200">
                Subscribe
            </button>
        </div>
    );
};

export default Subscriptoncard;