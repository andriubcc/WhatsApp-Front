import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  socket  from "socket.io-client";

interface IProps {
    name: string;
    roomName: string;
    storedName: string;
    rooms: string[];
    storedId: string;
}



export const UserContext = createContext({} as any);

export const UserStorage = ({children}: any) => {
    const [ name, setName ] = useState('');
    const [ userId, setUserId ] = useState<IProps[]>([]);
    const [ storedName, setStoredName ] = useState(() => localStorage.getItem("storedName") as string)
    const [ storedId, setStoredId ] = useState(() => localStorage.getItem("storedId") as string)
    const [ roomName, setRoomName ] = useState('');
    const [ users, setUsers ] = useState<{id: string; name: string; rooms: [];}[]>([]);
    const [ rooms, setRooms ] = useState<{roomName: string}[]>([]);
    const [ newRoom, setNewRoom] = useState(false);
  
    

    const io = socket('http://localhost:4000');
    const navigate = useNavigate();
                
                   
    const handleCreateRoom = async ({ name, roomName }:IProps) => {
        try {
          const response = await fetch('http://localhost:4000/api/chat/join', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, roomName })
          });

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Erro ao criar sala", error)
        };


        navigate('/chat');
        setRoomName(roomName);
        setName(name);
        setStoredName(localStorage.setItem("storedName", name) as any)
        console.log(name)
        console.log(roomName)
        console.log(rooms)
        }

        const handleCreateNewRoom = async({ name, roomName }: IProps) => {
          try {
            const response = await fetch('http://localhost:4000/api/chat/add-room', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, roomName }),
            });
        
            const data = await response.json();
            console.log(data); // Verifique a resposta do servidor
          } catch (error) {
            console.error('Erro ao adicionar sala:', error);
          }
        }
    
    
         
          // const handleCreateNewRoom = ({ storedName, roomName}: IProps) => {              
          //   if( storedName && roomName ) {

              
          //     navigate('/chat');
          //     setRoomName(roomName);     
              
          //     if (storedName && storedId && roomName) {
          //       io.emit("createroom", storedName, roomName);
          //       console.log(`${storedName} criou nova sala ${roomName}`)
          
          //       io.on("users", (users) => {
          //         setUsers(users);
          //         console.log(`Sala ${roomName} foi adicionada a rooms de ${storedName}`)
          //       });
          
          //       io.on("rooms", (rooms) => {
          //         setRooms(rooms)
          //       })
          //     }
              
        
          //     console.log(`${storedName} entrou criou sala ${roomName}`)
          //     console.log("name é",name, "roomName é", roomName, "storedId é", storedId, "storedName é", storedName)
          // }}


      


    return (
        <UserContext.Provider value={{ handleCreateRoom, handleCreateNewRoom, name, setName, roomName, setRoomName, storedName, setStoredName, storedId, setStoredId }}>
            {children}
        </UserContext.Provider>
    )
}