import ReportDetails from '@/components/(adminDashboard)/Reportings/ReportDetails';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <ReportDetails reportId={id} />
        </div>
    );
};

export default page;