import { Container } from "./styles";
import { UserContext } from "contexts/usercontext";
import {  useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  socket  from "socket.io-client";

const io = socket('http://localhost:4000');

interface IProps {
  name: string;
  roomName: string;
  storedName: string;
}



function CreateNewRoom() {
  const [ users, setUsers ] = useState<{id: string; name: string}[]>([]);
  const [ rooms, setRooms ] = useState<string[]>([]);
  const [ name, setName ] = useState('');
  // const [ name, setName ] = useState(localStorage.getItem("storedName"));

  

  const navigate = useNavigate();

   const { handleCreateNewRoom, storedName, setStoredName, roomName, setRoomName } = useContext(UserContext);
 
  useEffect (() => {
      setName(storedName);
      console.log(storedName);
      console.log(name);   
  }, [name]);
  

  return (
        <Container>
             <div>
        <span>Nome da sala</span>
        <input  value={roomName} onChange={(e) => setRoomName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleCreateNewRoom({ name, roomName } as any)}}/>  
        <button onClick={() => handleCreateNewRoom({ name, roomName } as any)}>Entrar</button>
      </div>
        </Container>
    )
}


export default CreateNewRoom;