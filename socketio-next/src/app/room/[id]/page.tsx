'use client'
import { useParams } from 'next/navigation';
import styles from '../../page.module.css'

export default function Page() {
  const route = useParams();
  const roomId = route.id || "";

  return (
    <main className={styles.main}>
      <h1>Room</h1>
      <p>id: {roomId}</p>
    </main>
  );
};