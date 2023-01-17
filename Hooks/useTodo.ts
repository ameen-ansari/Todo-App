import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function useTodo() {
  const [loader, setLoader] = useState<boolean>(false);
  const [input, setinput] = useState<string>("");
  const [uid, setuid] = useState<string>("");
  const [authuid, setauthuid] = useState<string>("");
  const [userData, setUserData] = useState<any>([]);

  const save = async () => {
    if (auth?.currentUser) {
      let savebtn1 = document.getElementById("savebtn1") as HTMLButtonElement;
      if (input.length > 0) {
        try {
          savebtn1.disabled = true;
          addDoc(collection(db, auth?.currentUser.uid), {
            description: input,
            status: false,
          }).then((doc1) => {
            setuid(doc1.id);
            setUserData([
              ...userData,
              {
                description: input,
                id: doc1.id,
                status: false,
              },
            ]);
            if (auth?.currentUser?.uid) {
              const washingtonRef = doc(db, auth.currentUser?.uid, doc1.id);
              updateDoc(washingtonRef, {
                id: doc1.id,
              });
            }
          });
        } catch (error) {
          alert(error);
        } finally {
          savebtn1.disabled = false;
          setinput("");
        }
      } else {
        alert("Invalid Input");
      }
    } else {
      alert("Please SignUp First");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      try {
        if (user?.uid) {
          getDocs(collection(db, user?.uid)).then((Q) => {
            setLoader(true);
            let arr: any = [];
            Q.forEach((doc) => {
              arr.push(doc.data());
              setUserData(arr);
            });
          });
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoader(false);
      }
    });
  }, []);
  let cancel = async (e: any) => {
    if (auth?.currentUser) {
      await deleteDoc(doc(db, "userData", e.id));
      let arr: any = [];
      userData.forEach((elem: any) => {
        if (elem.id !== e.id) {
          arr.push(elem);
          setUserData(arr);
        }
        if (userData.length === 1) {
          setUserData([]);
        }
      });
    } else {
      alert("Please SignUp First");
    }
  };

  let checked = async (e: any) => {
    let savebtn1 = document.getElementById("savebtn1") as HTMLButtonElement;
    let updatebtn1 = document.getElementById("updatebtn1") as HTMLButtonElement;
    if (auth?.currentUser) {
      savebtn1.style.display = "none";
      updatebtn1.style.display = "block";
      setinput(e.description);
      setuid(e.id);
    } else {
      alert("Please SignUp First");
    }
  };

  let updateD = async () => {
    let savebtn1 = document.getElementById("savebtn1") as HTMLButtonElement;
    let updatebtn1 = document.getElementById("updatebtn1") as HTMLButtonElement;
    if (auth?.currentUser) {
      try {
        userData.forEach((element: any) => {
          if (element.id === uid) {
            element.description = input;
          }
        });
        let QQ = doc(db, "userData", uid);
        await updateDoc(QQ, {
          description: input,
        });
        savebtn1.disabled = true;
      } catch (error) {
        alert(error);
      } finally {
        savebtn1.style.display = "block";
        updatebtn1.style.display = "none";
        savebtn1.disabled = false;
        setinput("");
      }
    } else {
      alert("Please SignUp First");
    }
  };
  let todoChecker = async (e: any) => {
    let checkBI = document.getElementById(e.id) as HTMLInputElement;
    if (auth?.currentUser) {
      if (checkBI.type === "checkbox") {
        let QQ = doc(db, "userData", e.id);
        if (checkBI.checked) {
          await updateDoc(QQ, {
            status: true,
          });
        } else {
          await updateDoc(QQ, {
            status: false,
          });
        }
        let arr2: any = [];
        userData.forEach((doc: any) => {
          if (doc.id === e.id) {
            if (doc.status === true) {
              doc.status = false;
            } else {
              doc.status = true;
            }
          }
          arr2.push(doc);
          setUserData(arr2);
        });
      } else {
        console.log("Type Is NOt CheckBox");
      }
    } else {
      alert("Please SignUp First");
    }
  };
  let logOut = async () => {
    if (auth?.currentUser) {
      await signOut(auth);
    }
  };

  return {
    loader,
    setLoader,
    input,
    setinput,
    uid,
    setuid,
    userData,
    setUserData,
    save,
    cancel,
    checked,
    updateD,
    todoChecker,
    logOut,
  };
}
