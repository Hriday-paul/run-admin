
import EditStore from '@/components/(adminDashboard)/Store-management/EditStore';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <EditStore id={id} />
        </div>
    );
};

export default page;