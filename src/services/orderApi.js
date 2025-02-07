import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4700/orders" }),
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
        headers: {
          token: window.localStorage.getItem("token"),
        },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/deleteproduct/${id}`,
        method: "DELETE",
        headers: {
          token: window.localStorage.getItem("token"),
        },
      }),
    }),
    placeorder: builder.mutation({
      query: (order) => ({
        url: "/placeorder",
        method: "POST",
        body: order,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      }),
    }),
    acceptorder: builder.mutation({
      query: (id) => ({
        url: `/acceptorder/${id}`,
        method: "PUT",
        body: id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      }),
    }),
    dispatchorder : builder.mutation({
      query : (id) =>({
        url : `/dispatchorder/${id}`,
        method : 'PUT',
        body : id,
        headers : {
          token : window.localStorage.getItem('token')
        }
      })
    }),
    deliverorder : builder.mutation({
      query : (id) => ({
        url : `/deliverorder/${id}`,
        method : 'PUT',
        body : id,
        headers : {
          token : window.localStorage.getItem('token')
        }
      })
    }),
    getOrderByUsername : builder.query({
      query : (username)=>({
        url : `/orderbyusername?username=${username}`,
        method : 'GET',
        headers : {
          token : window.localStorage.getItem('token')
        }
      })
    })
  }),
});

export const { usePlaceorderMutation,useGetAllOrdersQuery,useLazyGetAllOrdersQuery,useDeleteOrderMutation,useAcceptorderMutation,useDispatchorderMutation,useDeliverorderMutation,useGetOrderByUsernameQuery } = orderApi;
