import { UserContext } from "contexts/usercontext";
import { Container } from "./styles";
import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  name: string;
  roomName: string;
}


function CreateRoom() {
  const [ name, setName ] = useState('');
  const [ storedName, setStoredName ] = useState(() => localStorage.getItem("storedName") as string)
  const [ roomName, setRoomName ] = useState('');

  const navigate = useNavigate()
    

    const { handleCreateRoom } = useContext(UserContext);

    // const handleJoin = ({name, roomName}:IProps) => {
    //   navigate('/chat');
    //   setRoomName(roomName);
    //   setName(name);
    //   setStoredName(localStorage.setItem("storedName", name) as any);

      
    //   console.log(name)
    //   console.log(roomName)
    //   }


    return (
        <Container>
             <div>
        <span>Nome</span>
        <input  value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleCreateRoom({ name, roomName })}}/>  
        <span>Nome da sala</span>
        <input  value={roomName} onChange={(e) => setRoomName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleCreateRoom({ name, roomName })}}/>  
        <button onClick={() => handleCreateRoom({ name, roomName })}>Entrar</button>
      </div>
        </Container>
    )
}


export default CreateRoom;