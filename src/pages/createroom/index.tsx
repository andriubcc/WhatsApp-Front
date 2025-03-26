import { UserContext } from "contexts/usercontext";
import { Container } from "./styles";
import  { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  name: string;
  roomName: string;
  storedEmail: string;
}


function CreateRoom() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ storedName, setStoredName ] = useState(() => localStorage.getItem("storedName") as string);
  const [ roomName, setRoomName ] = useState('');
  const [ storedEmail, setStoredEmail ] = useState(() => localStorage.getItem("email") as string);

  const navigate = useNavigate()
    

    const { handleCreateRoom } = useContext(UserContext);

    useEffect(() => {
      setEmail(storedEmail);
      console.log({storedEmail, email})
    }, [email])


    return (
        <Container>
             <div>
        <span>Nome da sala</span>
        <input  value={roomName} onChange={(e) => setRoomName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleCreateRoom({ email, roomName })}}/>  
        <button onClick={() => handleCreateRoom({ email, roomName })}>Criar Sala</button>
      </div>
        </Container>
    )
}


export default CreateRoom;