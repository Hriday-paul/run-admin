import Image from 'next/image';
import React from 'react';
import supportUser from '@/assets/image/support_user.png'

const Supportcard = () => {
    return (
        <div className="w-full">
            <div>
                <div className="flex gap-4 items-start">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-1">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    </div>

                    <div className='border border-stroke p-4  rounded-lg flex flex-row gap-x-5 items-center'>
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <Image
                                src={supportUser}
                                alt="Sarah - VitaMedical Nurse"
                                className="w-auto h-full rounded-lg object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-700 leading-relaxed mb-3">
                                "Meet Sarah, one of our amazing nurses at VitaMedical. Using our cutting-edge app, she ensures every IV
                                treatment is safe and personalize...{" "}
                                <button className="text-blue-600 hover:text-blue-800 font-medium">Read More</button>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-500">24 Feb, 2025</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Supportcard;