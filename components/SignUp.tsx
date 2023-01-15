import { useState } from "react";
import logincss from "/styles/SignUp.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import {auth} from '/config/Firebase.ts'
import { auth } from "../config/Firebase";

export default function SignUp() {
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
  async function submit(e: any) {
    e.preventDefault();

    try {
      let obj = await createUserWithEmailAndPassword(auth, values.email, values.password)
      alert('Acount Created Successfully')
      setvalues({
        email: "",
        userName: "",
        phoneNumber: "",
        password: "",
        uid: "",
      });
    } catch (e) {
      alert(e);
    }
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
                Enter Email address
              </label>
              <input
                type="email"
                placeholder="Enter username or email address"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={values.email}
                onChange={register}
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
                name="userName"
                value={values.userName}
                onChange={register}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Contact Number
              </label>
              <input
                placeholder="Contact Number"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="phoneNumber"
                value={values.phoneNumber}
                aria-describedby="emailHelp"
                onInput={register}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                placeholder="Password"
                name="password"
                type="password"
                className="form-control"
                value={values.password}
                id="exampleInputPassword1"
                onChange={register}
              />
              <div id="emailHelp" className="form-text">
                Have a acount ? SignIn
              </div>
            </div>
            <button onClick={submit} type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
