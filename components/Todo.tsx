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
} from "firebase/firestore";
import img1 from "/Images/edit.png";
import img2 from "/Images/cancel (1).png";
import Image from "next/image";
import { db } from "../config/Firebase";

export default function Home() {
  const [ldg, setldg] = useState<any>(false);
  const [data, setdata] = useState<any>([]);
  const [userInput, setUserInput] = useState<any>({
    description: "",
    id: Date.now(),
  });
  const [doneTodos, setDoneTodos] = useState<any>([]);
  useEffect(() => {
    try {
      let gdata = async () => {
        let arr1: any = [];
        let QS = await getDocs(collection(db, "UserData"));
        QS.forEach((doc) => {
          arr1.push(doc.data());
        });
        setdata([...arr1]);
        setldg(true);
      };
      gdata();
    } catch (err) {
      alert(err);
    } finally {
      setldg(false);
    }
  }, []);
  const save = async (e: any) => {
    try {
      await addDoc(collection(db, "UserData"), userInput);

      e.target.disabled = true;
    } catch (err) {
      alert(err);
    } finally {
      e.target.disabled = false;
    }
    setdata([...data, userInput]);
    setUserInput({
      description: "",
      id: "",
    });
  };

  let cancel = async (e: any) => {
    let rmdoc = "";
    let q = query(collection(db, "UserData"), where("id", "==", e.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      rmdoc = doc.id;
    });
    await deleteDoc(doc(db, "UserData", rmdoc));
    let QS = await getDocs(collection(db, "UserData"));
    QS.forEach((docmt) => {
      let arr1 = [];
      arr1.push(docmt.data());
      setdata(arr1);
    });
    if (data.length === 1) {
      setdata([]);
    }
  };

  let checked = (e: string) => {
    console.log(e);
  };

  let reset = () => {};
  let arr: any = [];

  return (
    <div className={styles.parent}>
      <div className={styles.todo}>
        <div className={styles.manager}>
          <input
            onChange={(e) => {
              setUserInput({
                id: Date.now(),
                description: e.target.value,
              });
            }}
            value={userInput?.description}
            type="text"
            placeholder="Add A Task Here..."
          />
          <button id="btn1" onClick={save}>
            +
          </button>
        </div>
        <div className={styles.todos}>
          {data.map((item: any, i: any) => {
            return (
              <div key={i} className={styles.inmap}>
                <div className={styles.intodop1}>
                  <div>
                    <input type="checkbox" className={styles.checkb} />
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
          {ldg === true ? <p></p> : <p>Loading...</p>}
          {/* {data.length === 0 ? <p>{ldg}</p> : <p>{ldg}</p>} */}
          {/* <hr className={styles.hr} /> */}

          {/* {doneTodos.map((item, i) => {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: "rgb(92, 133, 217)",
                  color: "#FFFFFF",
                }}
              >
                <p>{item}</p>
                <div>
                  <span
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "rgb(92, 133, 217)",
                    }}
                  >
                    &#10004;
                  </span>
                </div>
              </div>
            );
          })}
          {doneTodos.length !== 0 ? (
            <button onClick={reset}>Clear</button>
          ) : (
            <p></p>
          )} */}
        </div>
      </div>
    </div>
  );
}
