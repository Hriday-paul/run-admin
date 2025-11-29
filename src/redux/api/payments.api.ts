import { IBrand, IMeta, TPayment } from "../types";
import baseApi from "./baseApi";

const PaymentsApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        allPayments: builder.query<
            { message: string; data: {data : TPayment[], meta : IMeta} },
            {}
        >({
            query: (query) => ({
                url: "/payments",
                params: query
            }),
            providesTags: ["payments"],
        }),


    }),
});

export const {useAllPaymentsQuery} = PaymentsApi;