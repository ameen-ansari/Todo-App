import { useState } from "react";
import logincss from "/styles/SignUp.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from '@mui/material'
// import img1 from '../Images/fb.png'
// import img3 from '../Images/Group 50.png'
// import img4 from '../Images/iph.png'
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../Firebase"
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { db } from '../Firebase'
// import { addDoc, collection } from 'firebase/firestore'

export default function SignUp() {
  // let navigate = useNavigate()
  let [values, setvalues] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
    password: "",
    uid: "",
  });
  function register(e: any) {
    let inputs = { [e.target.name]: e.target.value };
    setvalues({ ...values, ...inputs });
  }
  async function submit() {
    //     try {
    //         let obj = await createUserWithEmailAndPassword(auth, values.email, values.password)
    //         let user = obj.user.uid
    //         setvalues(values.uid = user)
    //         alert('Acount Created Successfully')
    //         navigate('/')
    //         await addDoc(collection(db ,"users"),values)
    //         setvalues({
    //             email: "",
    //             userName: "",
    //             phoneNumber: "",
    //             password: "",
    //             uid:""
    //         })
    //     } catch (e) {
    //         alert(e.message)
    //     }
  }
  return (
    <div className={logincss.container}>
      <div className={logincss.login}>
        <div className={logincss.head}>
          <p>
            Welcome to <span style={{ color: "#F46A06" }}>TODO-APP</span>
          </p>
        </div>
        <p>Sign up</p>
        <div className="w-100">
          <form className="w-100">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter username or email address
              </label>
              <input
                type="email"
                placeholder="Enter username or email address"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="User Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
              Contact Number
              </label>
              <input
              placeholder='Contact Number'
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
              placeholder="Password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              <div id="emailHelp" className="form-text">
                Have a acount ? SignIn
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
