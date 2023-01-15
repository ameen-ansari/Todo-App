import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useRouter } from "next/router";

export default function useSignIn() {
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
  return {
    values,
    setvalues,
    register,
    submit,
  };
}
