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
let uid :string= ""
    try {
      let object = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      uid = object.user.uid
      router.push("/");
      
      setvalues({
        email: "",
        userName: "",
        phoneNumber: "",
        password: "",
      });
      let obj1 = {...values , uid}
      setvalues(obj1)
      await addDoc(collection(db , 'Users') , obj1)
    } catch (e) {
      alert(e);
    }finally{
    }
  }
  return {
    values,
    setvalues,
    register,
    submit,
  };
}
