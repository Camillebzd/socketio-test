'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserId from "../hooks/useUserId";
import { connect, disconnect } from "@/redux/features/authSlice";
import { socketActions } from "@/redux/features/socketSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Home() {
  const [roomList, setRoomList] = useState<any[]>([]);
  const [roomPasswordToCreate, setRoomPassword] = useState("");
  const userId = useUserId();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state) => state.socketReducer.isConnected);

  useEffect(() => {
    // init the socket
    dispatch(socketActions.initSocket());
  }, []);

  // Listen events on the socket
  useEffect(() => {
    // router.push(`/room/${roomId}`);

    if (userId && isConnected) {
      dispatch(connect(`0x${userId.toString()}`));

    }
  }, [userId, isConnected]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Socket io test
        </p>
      </div>

      <div className={styles.center}>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
        Random user id: {userId}
      </div>

      <div>
        <p>Rooms:</p>
        <div className={styles.grid}>
          {roomList.map(roomList => 
            <button>
              room {roomList.id}
            </button>
          )}
        </div>
      </div>

      <div className={styles.grid}>

        <button
          className={styles.card}
        >
          Join a room
        </button>

        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  );
}
