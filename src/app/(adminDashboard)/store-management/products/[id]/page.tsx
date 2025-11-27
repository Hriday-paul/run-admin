import UserDetails from '@/components/(adminDashboard)/user/UserDetails';
import React from 'react';

const Page = async({params}:{params : Promise<{id : string}>}) => {
    const {id} = await params;
    return (
        <div>
            <UserDetails storeId={id}/>
        </div>
    );
};

export default Page;