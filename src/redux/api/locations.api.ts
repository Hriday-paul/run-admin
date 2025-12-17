
import { IArea, IDistrict, IDivision } from "../types";
import baseApi from "./baseApi";

const LocationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allDivisions: builder.query<{ message: string, data: { divisions: IDivision[] } }, void>({
            query: () => ({
                url: '/locations/divisions',
            }),
            providesTags: ['divisions']
        }),
        addDivision: builder.mutation<{ message: string }, {name : string}>({
            query: ({name}) => ({
                url: '/locations/divisions',
                method : "POST",
                body : {name}
            }),
            invalidatesTags: ['divisions']
        }),
        dltDivision: builder.mutation<{ message: string }, {id : number}>({
            query: ({id}) => ({
                url: `/locations/divisions/${id}`,
                method : "DELETE",
            }),
            invalidatesTags: ['divisions']
        }),

        districtsByDivision: builder.query<{ message: string, data: IDistrict[] }, { }>({
            query: (query) => ({
                url: `/locations/districts`,
                params : query
            }),
            providesTags: ['districts']
        }),
        
        districts: builder.query<{ message: string, data: IDistrict[] }, void>({
            query: () => ({
                url: `/locations/districts/all`,
            }),
            providesTags: ['districts']
        }),
        dltDistrict: builder.mutation<{ message: string }, {id : number}>({
            query: ({id}) => ({
                url: `/locations/districts/${id}`,
                method : "DELETE",
            }),
            invalidatesTags: ['districts']
        }),

        addDistrict: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/locations/districts',
                method : "POST",
                body
            }),
            invalidatesTags: ['districts']
        }),
        areasByDivDistrict: builder.query<{ message: string, data: IArea[] }, {}>({
            query: (query) => ({
                url: `/locations/areas`,
                params : query
            }),
            providesTags: ['areas']
        }),

         areas: builder.query<{ message: string, data: IArea[] }, {}>({
            query: (query) => ({
                url: `/locations/areas/all`,
                params : query
            }),
            providesTags: ['areas']
        }),

        dltArea: builder.mutation<{ message: string }, {id : number}>({
            query: ({id}) => ({
                url: `/locations/areas/${id}`,
                method : "DELETE",
            }),
            invalidatesTags: ['areas']
        }),

        addArea: builder.mutation<{ message: string }, any>({
            query: (body) => ({
                url: '/locations/areas',
                method : "POST",
                body
            }),
            invalidatesTags: ['areas']
        }),

    })
})

export const { useAllDivisionsQuery, useDistrictsByDivisionQuery, useDistrictsQuery, useAreasByDivDistrictQuery, useAddDistrictMutation, useAddDivisionMutation, useAddAreaMutation, useAreasQuery, useDltAreaMutation, useDltDistrictMutation, useDltDivisionMutation } = LocationApi;