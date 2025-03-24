import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://construction-mart-backend-k0rw.onrender.com/products' }),
  endpoints: (builder) => ({
    getAllProducts : builder.query({
      query : () =>({
        url :'/'
      })
    }),
    getProductByCategoryName : builder.query({
      query : (categoryname) =>({
        url : `/cat/${categoryname}`
      })
    }),
    getProductDetailsById: builder.query({
      query : (id) =>({
        url : `${id}`
      })
    }),
    addnewproduct : builder.mutation({
      query : (product) => ({
        url : '/addnewproduct',
        method : 'POST',
        body : product,
        headers : {
            token : window.localStorage.getItem('token')
        }
      })
    }),
    searchProducts: builder.query({
      query: (searchQuery) => ({
        url: `/search/${searchQuery}`,
      }),
    }),
  })
})


export const { useGetAllProductsQuery,useGetProductDetailsByIdQuery,useAddnewproductMutation,useSearchProductsQuery,useGetProductByCategoryNameQuery } = productApi