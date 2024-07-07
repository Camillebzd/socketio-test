'use client'

import styles from "@/app/page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DEFAULT_ROOM_ID, socketActions } from "@/redux/features/socketSlice";
import { useRouter } from "next/navigation";

const CreateRoomButton = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state) => state.socketReducer.isConnected);
  const room = useAppSelector((state) => state.socketReducer.room);
  const router = useRouter();

  const createNewRoom = () => {
    dispatch(socketActions.createNewRoom({ password: "" }));
  };

  const createRoomButton = () => (
    <button
      disabled={!isConnected}
      onClick={() => createNewRoom()}
      className={styles.card}
    >
      Create a room
    </button>
  );

  const goToRoomPageButton = () => (
    <button
      disabled={room.id == DEFAULT_ROOM_ID}
      onClick={() => router.push(`/room/${room.id}`)}
      className={styles.card}
    >
      Go to room
    </button>
  );

  return (
    <div>
      {room.id !== DEFAULT_ROOM_ID ? goToRoomPageButton() : createRoomButton()}
    </div>
  );
}

export default CreateRoomButton;