'use client'
import { useParams } from 'next/navigation';
import styles from '../../page.module.css'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { socketActions } from "@/redux/features/socketSlice";
import SkillButton from '@/components/SkillButton';
import { Skill } from '../../../../../socketio-server/src/@types/Skill';

export default function Page() {
  const route = useParams();
  const roomId: string = route.id as string || "";
  const dispatch = useAppDispatch();
  const skills =  useAppSelector((state) => state.socketReducer.room.skillsSelected);
  const [skillsOrdered, setSkillsOrdered] = useState<number[]>([]);

  useEffect(() => {
    if (roomId.length > 1)
      dispatch(socketActions.enterFight(roomId));
  }, [roomId]);

  useEffect(() => {
    let values = Object.values(skills).map(Number);
    values.sort((a, b) => a - b);
    setSkillsOrdered(values);
  }, [skills]);
  
  return (
    <main className={styles.main}>
      <h1>Room</h1>
      <p>id: {roomId}</p>
      <div>
        <p>Current order:</p>
        <div className={styles.grid}>
          {skillsOrdered.map((value) => (
            <p key={value}>{value}</p>
          ))}
        </div>
      </div>
      <div className={styles.grid}>
        <SkillButton />
        <SkillButton />
        <SkillButton />
        <SkillButton />
      </div>
    </main>
  );
};