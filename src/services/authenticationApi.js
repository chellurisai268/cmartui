import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4700/users' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url : '/signup',
        method : 'POST',
        body : user
      }),
    }),
    login : builder.mutation({
      query : (user) => ({
        url : '/login',
        method : 'POST',
        body : user
      })
    })
  }),
})


export const { useSignupMutation,useLoginMutation } = authenticationApi