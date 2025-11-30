
import { Package } from "../types";
import baseApi from "./baseApi";

const PackageApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        allPackages: builder.query<
            { message: string; data: Package[] },
            {}
        >({
            query: (query) => ({
                url: "/packages",
                params: query
            }),
            providesTags: ["packages"],
        }),

        createPackage: builder.mutation<
            {
                message: string;
            },
            Package
        >({
            query: (body) => ({
                url: "/packages",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["packages"]
        }),
        updatePackage: builder.mutation<
            {
                message: string;
            },
            {body : Package, id : number}
        >({
            query: ({body, id}) => ({
                url: `/packages/${id}`,
                method: "PATCH",
                body: body,
            }),
            invalidatesTags: ["packages"]
        }),
        deletePackage: builder.mutation<
            {
                message: string;
            },
            number
        >({
            query: (id) => ({
                url: `/packages/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["packages"]
        }),
       


    }),
});

export const { useAllPackagesQuery, useCreatePackageMutation, useUpdatePackageMutation, useDeletePackageMutation } = PackageApi;