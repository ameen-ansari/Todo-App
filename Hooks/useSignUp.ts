import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useRouter } from "next/router";

export default function useSignUp() {
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
  const router = useRouter();
  async function submit(e: any) {
    e.preventDefault();

    try {
      let obj = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      alert("Acount Created Successfully");
      router.push("/");
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
  return  {
    values,
    setvalues,
    register,
    submit,
  }
}
