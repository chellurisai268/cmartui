import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../services/authenticationApi';


function Signup() {
  var [signupFn] = useSignupMutation();
  var navigate = useNavigate();
  var initialValues = { 
     username : '',
     password : '',
     role : '',
     mobile : ''
  }
  const [errmsg,setErrmsg]=useState('');
  var onSubmit = (values)=>{
    console.log(values);
    signupFn(values).then((res)=>{
        console.log(res);
        if(res.data.msg=="Signup success"){
          navigate('/login');
        }else{
          setErrmsg(res.data.msg);
        }
    });
  }
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {
            () => {
                return (
                  <div className="row justify-content-center" style={{ marginTop: '100px' }}>
                      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className='border border-light p-4 rounded shadow'>
                           <h3 className="text-center mb-4">SIGN UP</h3>
                              <Form>
                                <Field name='username' className='form-control p-2 mb-3'placeholder='Username' /><br />
                                <Field name='password' type='password' className='form-control p-2 mb-3' placeholder='Password'/ ><br />
                                <Field name='role' type='role' className='form-control p-2 mb-3' placeholder='Role'/ ><br />
                                <Field name='mobile' type='number' className='form-control p-2' placeholder='Mobile'/ ><br />
                                {errmsg && <p style={{color:"red"}}>{errmsg}</p>}
                                <button className='btn btn-success w-100 mb-2'>Signup</button>
                                <h6 className="text-center mt-3">
                                  Already have an account ? <Link to='/login' className='text-decoration-none'>Login</Link>
                                </h6>
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

export default Signup
