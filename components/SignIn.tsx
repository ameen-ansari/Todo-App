import { useState } from "react";
import logincss from "/styles/SignUp.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  let [values, setvalues] = useState({
    email: "",
    password: "",
  });
  function register(e: any) {
    let inputs = { [e.target.name]: e.target.value };
    setvalues({ ...values, ...inputs });
  }
  async function submit(e: any) {
    e.preventDefault();
    try {
      let obj = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      router.push("/");
      setvalues({
        email: "",
        password: "",
      });

      alert("Sign In");
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
                name="email"
                value={values.email}
                onChange={register}
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
                name="password"
                value={values.password}
                onChange={register}
              />
              <div id="emailHelp" className="form-text mt-1">
                <Link href="/todo/SignUp" style={{ textDecoration: "none" }}>
                  Don't have a Acount ? SignUP
                </Link>
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
