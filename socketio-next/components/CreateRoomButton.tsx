'use client'

const CreateRoomButton = () => {
  const socket = "test";

  return (
    <div>
      <button
        onClick={() => createNewRoom()}
        className={styles.card}
      >
        Create a room
      </button>
    </div>
  );
}

export default CreateRoomButton;