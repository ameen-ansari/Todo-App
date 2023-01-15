import styles from "../styles/Home.module.css";
import Link from "next/link";
import img1 from "/Images/edit.png";
import img2 from "/Images/cancel (1).png";
import Image from "next/image";
import useTodo from "../Hooks/useTodo";
import { auth } from "../config/Firebase";

export default function Home() {
  const {
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
  } = useTodo();

  return (
    <div className={styles.parent}>
      <div className={styles.AuthF}>
        <button>
          <Link href="/todo/SignUp" style={{ textDecoration: "none" }}>
            SignUp
          </Link>
        </button>
      </div>
      <div className={styles.AuthStateMent}>
        <h2>
          {auth.currentUser?.email ? auth.currentUser?.email : "SignUp Now..."}
        </h2>
      </div>
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
