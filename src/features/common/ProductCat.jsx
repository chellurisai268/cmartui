import React from 'react'
import { useGetAllProductsQuery,useGetProductByCategoryNameQuery } from '../../services/productApi'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './nav.css'
function Products() {
    const {cat}=useParams();
    console.log("cat",cat);
    // const { isLoading,data:products } = useGetAllProductsQuery();
    const { isLoading,data:products } = useGetProductByCategoryNameQuery(cat);
    console.log(isLoading,products)
  return (
    <div className='p-4'>
      <h3 className='text-center'>{cat.toUpperCase()}</h3>
      <div className='d-flex flex-wrap h'>
        {
            !isLoading && products?.map((p)=>{
                return (
                    <div className='p-4'>
                        <div className="card mt-1 p-2 shadow" style={{width: "19rem",height:'450px'}}>
                            <Link to={`/productdetails/${p._id}`}>
                                <img src={p.imgUrl} className="card-img-top" style={{height:"320px"}}/>
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title mt-4"><b>NAME</b> : {p.name}</h5>
                                {/* <h5 className="card-title"><b>COMPANY</b> : {p.company}</h5> */}
                            </div>
                        </div> 
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Products
