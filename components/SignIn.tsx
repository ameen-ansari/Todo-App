import { useState } from "react";
import logincss from "/styles/SignUp.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <p>Sign In</p>
        <div className="w-100 mb-4">
          <form className="w-100 mb-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter Email address
              </label>
              <input
                type="email"
                placeholder="Enter Email address"
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
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <div id="emailHelp" className="form-text mt-1">
                Don't have a Acount ? SignUP
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
