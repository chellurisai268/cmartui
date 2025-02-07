import { Field, Form, Formik } from 'formik'
import React from 'react'
import '../../App.css'
import { useAddnewproductMutation } from '../../services/productApi'
function AddProducts() {
    const [addProduct] = useAddnewproductMutation();
    const initialValues = {
        name : '',
        price : '',
        imgUrl : '',
        company : '',
        category : '',
        description : ''
    }

    // const onSubmit = (values) => {
    //     addProduct(values).then((res)=>{
    //         console.log(res);
    //     })
    // }
    const onSubmit = async (values) => {
        try {
          const res = await addProduct(values);
          console.log(res);
          alert("Product Added Successfully");
        } catch (e) {
          console.log(e);
        }
    };
      
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {
            ()=>{
                return (
                    <div className="row justify-content-center" style={{ marginTop: '10px' }}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-8">
                            <div className='border border-light p-4 rounded shadow'>
                                <h3 className="text-center mb-4 text-dark">ADD PRODUCT</h3>
                                <Form>
                                    <Field name='name' className='form-control p-2 mb-3'placeholder='Name'/>
                                    <Field name='price' className='form-control p-2 mb-3'placeholder='Price'/>
                                    <Field name='imgUrl' className='form-control p-2 mb-3'placeholder='Image URL'/>                
                                    <Field name='company' className='form-control p-2 mb-3'placeholder='Company'/>                
                                    <Field name='category' className='form-control p-2 mb-3'placeholder='Category'/>
                                    <Field name='description' className='form-control p-2 mb-3'placeholder='Description'/>
                                    <button className='btn btn-light'>Save Product</button>                
                                </Form>
                            </div>
                        </div>
                    </div>
                )
            }
        }
      </Formik>
    </div>
  )
}

export default AddProducts
