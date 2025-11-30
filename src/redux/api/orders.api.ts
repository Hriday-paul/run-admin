import { IMeta, IOrder } from "../types";
import baseApi from "./baseApi";

const OrderApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        allOrders: builder.query<
            { message: string; data: {data : IOrder[], meta : IMeta} },
            {}
        >({
            query: (query) => ({
                url: "/orders",
                params: query
            }),
            providesTags: ["orders"],
        }),

        
        updateOrderStatus: builder.mutation<
            { message: string},
            {orderId : number, status : string}
        >({
            query: ({orderId, status}) => ({
                url: `/orders/status/${orderId}`,
                body : {status},
                method : "PATCH"
            }),
            invalidatesTags: ["orders"],
        }),
       


    }),
});

export const {useAllOrdersQuery, useUpdateOrderStatusMutation} = OrderApi;