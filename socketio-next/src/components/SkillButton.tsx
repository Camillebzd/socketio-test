'use client'

import styles from "@/app/page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { socketActions } from "@/redux/features/socketSlice";

const SkillButton = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const dispatch = useAppDispatch();
  const myId = useAppSelector((state) => state.authReducer.address);
  const mySkillSelected = useAppSelector((state) => state.socketReducer.room.skillsSelected)[myId];


  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const selectSkill = () => {
    dispatch(socketActions.selectSkill(randomNumber.toString()));
  };

  return (
    <button
      onClick={() => selectSkill()}
      className={styles.card}
      style={{backgroundColor: mySkillSelected === undefined || mySkillSelected !== randomNumber.toString() ? '' : 'blue'}}
    >
      {randomNumber}
    </button>
  );
}

export default SkillButton;