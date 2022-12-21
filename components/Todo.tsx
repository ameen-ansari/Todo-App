import { useState } from "react";
import styles from "../styles/Home.module.css";
import { collection, addDoc } from "firebase/firestore";
import img1 from "/Images/edit.png";
import img2 from "/Images/cancel (1).png";
import Image from "next/image";

export default function Home() {
  const [data, setdata] = useState<string[]>(["hallo this is my first task"]);
  const [input, setinput] = useState<string>("");
  const [doneTodos, setDoneTodos] = useState<string[]>([]);

  const save = () => {
    if (input.length > 0) {
      let newdata: string[] = [...data, input];
      setdata(newdata);
      setinput("");
    } else {
      alert("Invalid");
    }
  };

  let checked = (e: string) => {
    let donedata: string[] = [...doneTodos, e];
    setDoneTodos(donedata);
    let filteredarr = data.filter((item) => {
      return item != e;
    });
    setdata(filteredarr);
  };

  let cancel = (e: string) => {
    let filteredarr = data.filter((item) => {
      return item != e;
    });
    setdata(filteredarr);
  };

  let reset = () => {
    setDoneTodos([]);
  };

  let a  = () =>{
    return new Date()
  }
let dt:object = a()
  return (
    <div className={styles.parent}>
      <div className={styles.todo}>
        <div className={styles.manager}>
          <input
            onChange={(e) => {
              setinput(e.target.value);
            }}
            value={input}
            type="text"
            placeholder="Add A Task Here..."
          />
          <span onClick={save}>+</span>
        </div>
        <div className={styles.todos}>
          {data.map((item, i) => {
            return (
              <div key={i} className={styles.inmap}>
                <div className={styles.intodop1}>
                  <div>
                    <input type="checkbox" className={styles.checkb} />
                    <p>{item}</p>
                  </div>
                  <div>
                    <Image src={img1} alt="xhr" width={20} height={20} />
                    <Image src={img2} alt="xhr" width={20} height={20} />
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
          {data.length === 0 ? <p>Add Some Task Now...</p> : <p></p>}
          <hr className={styles.hr} />

          {doneTodos.map((item, i) => {
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
          )}
        </div>
      </div>
    </div>
  );
}
