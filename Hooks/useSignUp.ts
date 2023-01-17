import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";

export default function useSignUp() {
  let [values, setvalues] = useState<any>({
    email: "",
    userName: "",
    phoneNumber: "",
    password: "",
  });
  function register(e: any) {
    let inputs = { [e.target.name]: e.target.value };
    setvalues({ ...values, ...inputs });
  }
  const router = useRouter();
  async function submit(e: any) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      await addDoc(collection(db , 'Users') , values)
      alert("Acount Created Successfully");
      router.push("/");
      
      setvalues({
        email: "",
        userName: "",
        phoneNumber: "",
        password: "",
      });
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
