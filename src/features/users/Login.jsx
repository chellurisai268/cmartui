import React ,{useState}from 'react'
import { Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './loginSlice';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../services/authenticationApi';



function Login() {
  var [loginFn] = useLoginMutation();
  var navigate = useNavigate();
  var dispatch = useDispatch();
  var initialValues = { 
     username : '',
     password : ''
  }
  const [errmsg,setErrmsg]=useState('');
  var onSubmit = (values) => {
    console.log(values);
    loginFn(values).then((res)=>{
        console.log(res);
        if(res.data.msg==="Login success"){
        window.localStorage.setItem("token",res.data.token)
        window.localStorage.setItem("role",res.data.role)
        window.localStorage.setItem("username",res.data.username)
        dispatch(setUser(res.data))
        toast.success('Login Success',{
          position : 'top-left'
        })
        navigate('/dashboard');
        }else{
          setErrmsg(res.data.msg);
        }
    })
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
                           <h3 className="text-center mb-4 text-dark">LOGIN</h3>
                              <Form>
                                <Field name='username' className='form-control p-2 mb-3'placeholder='Username' /><br />
                                <Field name='password' type='password' className='form-control p-2 mb-3' placeholder='Password'/ ><br />
                                {errmsg && <p style={{color:"red"}}>{errmsg}</p>}
                                <button className='btn btn-success w-100 mb-2'>Login</button>
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

export default Login
