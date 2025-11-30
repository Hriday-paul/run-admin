import { IAdminStats } from "../types";
import baseApi from "./baseApi";

const DashboardApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        userStats: builder.query<
            { message: string; data: IAdminStats },
            {}
        >({
            query: (query) => ({
                url: "/dashboard/stats",
                params: query
            }),
        }),

        userChart: builder.query<
            { message: string; data: { month: string, userCount: number }[] },
            {}
        >({
            query: (query) => ({
                url: `/dashboard/userChart`,
                params: query
            }),
        }),
        earningChart: builder.query<
            { message: string; data: { month: string, revenue: number }[] },
            {}
        >({
            query: (query) => ({
                url: `/dashboard/earningChart`,
                params: query
            }),
        }),


    }),
});

export const { useUserStatsQuery, useUserChartQuery, useEarningChartQuery } = DashboardApi;