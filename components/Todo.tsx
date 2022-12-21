import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import img1 from "/Images/edit.png";
import img2 from "/Images/cancel (1).png";
import Image from "next/image";
import { db } from "../config/Firebase";

export default function Home() {
  const [ldg, setldg] = useState<any>("");
  const [data, setdata] = useState<any>([]);
  const [userInput, setUserInput] = useState<any>({
    description: "",
    id: data.length + 1,
  });
  const [doneTodos, setDoneTodos] = useState<any>([]);
  const save = async (e: any) => {
    try {
      await addDoc(collection(db, "UserData"), userInput);
      console.log(e.target);
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

  let checked = (e: string) => {
    console.log(data);
    console.log(e);
  };

  let cancel = (e: string) => {
    console.log(e);
  };

  let reset = () => {};
  let arr: any = [];
  useEffect(() => {
    let arr:any = [];
    try {
      getDocs(collection(db, "UserData")).then((QS) => {
        QS.forEach((doc) => {
          arr.push(doc.data());
        });
      });
      setldg("Loading...");
      setdata(arr)
    } catch (error) {
      alert(error)
    }
    finally{
      setldg("Fecthed...");

    }
  },[]);
  return (
    <div className={styles.parent}>
      <div className={styles.todo}>
        <div className={styles.manager}>
          <input
            onChange={(e) => {
              setUserInput({
                id: data.length + 1,
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
                    <Image src={img1} alt="xhr" width={20} height={20} />
                    <Image src={img2} alt="xhr" width={20} height={20} />
                  </div>
                </div>
              </div>
            );
          })}
          {data.length === 0 ? <p>{ldg}</p> : <p>{ldg}</p>}
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
