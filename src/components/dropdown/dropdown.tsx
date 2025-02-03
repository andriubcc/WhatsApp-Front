import { useContext } from "react";
import { Container } from "./styles"
import { UserContext } from "contexts/usercontext";




function DropDown () {
   
    const { handleCreateNewRoom, name, roomName, setRoomName } = useContext(UserContext)
   
   
    return (
        <Container>
            <input  value={roomName} onChange={(e) => setRoomName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleCreateNewRoom({ name, roomName } as any)}}/>  
            <button onClick={() => handleCreateNewRoom({ name, roomName } as any)}>Criar</button>
        </Container>
    )
}

export default DropDown;