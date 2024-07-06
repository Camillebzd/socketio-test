'use client'

import styles from "@/app/page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { socketActions } from "@/redux/features/socketSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'

const JoinRoomButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [roomToJoin, setRoomToJoin] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const room = useAppSelector((state) => state.socketReducer.rooms[0]);

  const toogleShow = () => setShow(!show);

  const joinRoom = () => {
    if (roomToJoin == "")
      return;
    dispatch(socketActions.joinRoom({ id: roomToJoin, password: password }));
    onClose();
  };

  const goToRoomPageButton = () => (
    <button
      disabled={room == undefined}
      onClick={() => router.push(`/room/${room.id}`)}
      className={styles.card}
    >
      Go to room
    </button>
  );

  const joinRoomButton = () => (
    <button
      onClick={() => onOpen()}
      className={styles.card}
    >
      Join room
    </button>
  );

  return (
    <div>
      {room ? goToRoomPageButton() : joinRoomButton()}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Room info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              pr='4.5rem'
              placeholder='Enter room id'
              value={roomToJoin}
              onChange={(event) => setRoomToJoin(event.target.value)}
              style={{marginBottom: '10px'}}
            />
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={toogleShow}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={joinRoom}>Join Room</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default JoinRoomButton;