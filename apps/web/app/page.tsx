"use client"
import { useState } from "react";
import styles from "./page.module.css";



export default function Home() {
  const [roomId,setRoomId] = useState("")
  return (
    <div className={styles.page}>
      <input type="text" onChange={(e)=>{setRoomId(e.target.value)}} placeholder="roomId" id="" />
      <button onClick={()=>{
        
      }}>Join room</button>
      <h1>{roomId}</h1>
    </div>
  );
}
