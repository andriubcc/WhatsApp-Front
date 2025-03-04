import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  socket  from "socket.io-client";

interface IProps {
    name: string;
    roomName: string;
    storedName: string;
    rooms: string[];
    storedId: string;
    password: string;
    email: string;
    userPhoneNumber: string;
}



export const UserContext = createContext({} as any);

export const UserStorage = ({children}: any) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ userPhoneNumber, setUserPhoneNumber ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ login, setLogin] = useState(false);

    const [ storedName, setStoredName ] = useState(() => localStorage.getItem("storedName") as string)
    const [ storedId, setStoredId ] = useState(() => localStorage.getItem("storedId") as string)
    const [ roomName, setRoomName ] = useState('');

    const [ users, setUsers ] = useState<{id: string; name: string; rooms: [];}[]>([]);
    const [ rooms, setRooms ] = useState<{roomName: string}[]>([]);
    
  
    

    const io = socket('http://localhost:4000');
    const navigate = useNavigate();
                
                   
    const handleCreateRoom = async ({ email,roomName }:IProps) => {
        try {
          const response = await fetch('http://localhost:4000/api/chat/add-room', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, roomName })
          });

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Erro ao criar sala", error)
        };


        navigate('/chat');
        setRoomName(roomName);
        console.log(name)
        console.log(roomName)
        console.log(rooms)
        }
        

        const handleCreateUser = async ({ name, email, userPhoneNumber, password }: IProps) => {
          const phone_number = userPhoneNumber;
          
          try {
            const response = await fetch('http://localhost:4000/api/chat/create-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, phone_number, password }),
            });

            const data = await response.json();
            alert('Usuário criado com sucesso');
            console.log(data);
          } catch(error) {
            console.log('Erro ao criar usuário', error);
          }
        }

        
    
    
         
        const handleLogin = async ({ email, password }: IProps) => {
          try {
            const response = await fetch('http://localhost:4000/api/chat/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password })
            })
            const data = await response.json();
            console.log(data);
            setLogin(true);
            navigate('/chat');


          } catch (error) {
            console.log("Erro ao fazer login", error)
          } 
        }


        

      


    return (
        <UserContext.Provider value={{ handleCreateRoom, handleCreateUser, handleLogin, login, setLogin, name, setName,   roomName, setRoomName, storedName, setStoredName }}>
            {children}
        </UserContext.Provider>
    )
}