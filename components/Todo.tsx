import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import img1 from "/Images/edit.png";
import img2 from "/Images/cancel (1).png";
import Image from "next/image";
import { db } from "../config/Firebase";

export default function Home() {
  const [loader, setLoader] = useState<boolean>(false);
  const [input, setinput] = useState<string>("");
  const [uid, setuid] = useState<string>("");
  const [userData, setUserData] = useState<any>([]);

  const [doneTodos, setDoneTodos] = useState<any>([]);

  const save = async () => {
    let saveBtn: any = document.getElementById("savebtn1");
    if (input.length > 0) {
      try {
        saveBtn.disabled = true;
        addDoc(collection(db, "userData"), {
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
          const washingtonRef = doc(db, "userData", doc1.id);
          updateDoc(washingtonRef, {
            id: doc1.id,
          });
        });
      } catch (error) {
        alert(error);
      } finally {
        saveBtn.disabled = false;
        setinput("");
      }
    } else {
      alert("Invalid Input");
    }
  };
  // let updatebtn1 = document.getElementById("updatebtn1");

  useEffect(() => {
    try {
      getDocs(collection(db, "userData")).then((Q) => {
        setLoader(true);
        let arr: any = [];
        Q.forEach((doc) => {
          arr.push(doc.data());
          setUserData(arr);
        });
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoader(false);
    }
  }, []);
  let cancel = async (e: any) => {
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
  };

  let checked = async (e: any) => {
    let savebtn1: any = document.getElementById("savebtn1");
    let updatebtn1: any = document.getElementById("updatebtn1");
    savebtn1.style.display = "none";
    updatebtn1.style.display = "block";
    setinput(e.description);
    setuid(e.id);
  };

  let updateD = async () => {
    let savebtn1: any = document.getElementById("savebtn1");
    let updatebtn1: any = document.getElementById("updatebtn1");
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
  };
  let todoChecker = async (e: any) => {
    // let status: boolean = false;
    // let checkBI = document.getElementById(e.id);
    // try{
    //   if (checkBI?.checked === true) {
    //     let QQ = doc(db, "userData", e.id);
    //     await updateDoc(QQ, {
    //       status: true,
    //     });
    //   } else {
    //     let QQ = doc(db, "userData", e.id);
    //     await updateDoc(QQ, {
    //       status: false,
    //     });
    //   }
    // }catch(error){
    //   alert('error in check box',error)
    // }
    // let arr:any = []
    // userData.forEach((elem:any) => {
    //   if (elem.id === e.id ) {
    //     if (elem.status === true) {
    //       elem.status = false
    //     }else{
    //       elem.status = true
    //     }
    //     arr.push(elem)
    //     setUserData(arr)
    //   }else{
    //     arr.push(elem)
    //     setUserData(arr)
    //   }
    // });
  };

  return (
    <div className={styles.parent}>
      <div className={styles.todo}>
        <div className={styles.manager}>
          <input
            type="text"
            placeholder="Add A Task Here..."
            onChange={(e) => {
              setinput(e.target.value);
            }}
            value={input}
          />
          <button id="savebtn1" onClick={save}>
            +
          </button>
          <button
            id="updatebtn1"
            className={styles.updatebtn1}
            onClick={updateD}
          >
            +
          </button>
        </div>
        <div className={styles.todos}>
          {loader === false ? (
            <p>Loading...</p>
          ) : userData.length == 0 ? (
            <p>Add Some Now...</p>
          ) : (
            <p>Todos</p>
          )}
          {userData.map((item: any, i: any) => {
            return (
              <div key={i} className={styles.inmap}>
                <div className={styles.intodop1}>
                  <div>
                    <input
                      id={item.id}
                      onChange={() => todoChecker(item)}
                      type="checkbox"
                      className={styles.checkb}
                      checked={item.status}
                    />
                    <p>{item?.description}</p>
                  </div>
                  <div>
                    <Image
                      src={img1}
                      alt="xhr"
                      width={20}
                      height={20}
                      onClick={() => {
                        checked(item);
                      }}
                    />
                    <Image
                      src={img2}
                      alt="xhr"
                      width={20}
                      height={20}
                      onClick={() => {
                        cancel(item);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.intodop2}>
                  <div>
                    <Image
                      src={img1}
                      alt="xhr"
                      onClick={() => {
                        checked(item);
                      }}
                      width={20}
                      height={20}
                    />
                    <Image
                      src={img2}
                      onClick={() => {
                        cancel(item);
                      }}
                      alt="xhr"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
