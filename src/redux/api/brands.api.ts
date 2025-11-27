import { IBrand } from "../types";
import baseApi from "./baseApi";

const BrandApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        allBrands: builder.query<
            { message: string; data: IBrand[] },
            {}
        >({
            query: (query) => ({
                url: "/brands/for-admin",
                params: query
            }),
            providesTags: ["brands"],
        }),

        
        updateBrandStatus: builder.mutation<
            { message: string},
            {brandId : string, status : "rejected"| "approved"}
        >({
            query: ({brandId, status}) => ({
                url: `/brands/update-status/${brandId}`,
                body : {status},
                method : "PATCH"
            }),
            invalidatesTags: ["brands"],
        }),

        addBrand: builder.mutation<
            { message: string},
            {name : string}
        >({
            query: (payload) => ({
                url: `/brands/by-admin`,
                body : payload,
                method : "POST"
            }),
            invalidatesTags: ["brands"],
        }),
       


    }),
});

export const {useAllBrandsQuery, useUpdateBrandStatusMutation, useAddBrandMutation} = BrandApi;