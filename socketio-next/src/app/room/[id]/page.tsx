'use client'
import { useParams } from 'next/navigation';
import styles from '../../page.module.css'
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { socketActions } from "@/redux/features/socketSlice";

export default function Page() {
  const route = useParams();
  const roomId: string = route.id as string || "";
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (roomId.length > 1)
      dispatch(socketActions.enterFight(roomId));
  }, [roomId]);
  
  return (
    <main className={styles.main}>
      <h1>Room</h1>
      <p>id: {roomId}</p>
      <div>
        <p>Current order:</p>
      </div>
    </main>
  );
};