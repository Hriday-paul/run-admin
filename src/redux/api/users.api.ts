import { AdManager, IMeta, IUser } from "../types";
import baseApi from "./baseApi";

const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allusers: builder.query<
            { message: string; data: { meta: IMeta, data: IUser[] } },
            {}
        >({
            query: (query) => ({
                url: "/users",
                params: query,
            }),
            providesTags: ["users"],
        }),


        block_unblock: builder.mutation<{ message: string, data: { _id: string, name: string }[] }, { userId: number, status: boolean }>({
            query: ({ userId, status }) => ({
                url: `/users/status/${userId}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["users"]
        }),
        
        addVendor: builder.mutation<{ message: string, data: { _id: string, name: string }[] }, any>({
            query: (body) => ({
                url: `/users/add-vendor`,
                method: "POST",
                body
            }),
            invalidatesTags: ["users"]
        }),
        vendorAdManage: builder.mutation<{ message: string, data: { _id: string, name: string }[] }, {id : number, body : AdManager}>({
            query: ({body, id}) => ({
                url: `/users/manage-access/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["users"]
        }),


    }),
});

export const { useAllusersQuery, useBlock_unblockMutation, useAddVendorMutation, useVendorAdManageMutation} = UsersApi;
