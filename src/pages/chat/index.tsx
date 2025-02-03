import { useEffect, useState, useContext } from 'react';
import  socket  from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';
import { UserContext } from 'contexts/usercontext';
import DropDown from 'components/dropdown/dropdown';


type IProps = {
    name: string;
    users: [];
    message: string;
    messages: [];
    rooms: [];
    roomName: string;
    storedName: string
}

interface User {
  id: string;
  name: string;
  roomName: string;
  rooms: [];
}


const io = socket('http://localhost:4000');

function Chat() {
  
  const [ users, setUsers ] = useState<{ name: any; id: string; rooms: []}[]>([]);
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState<{ name: string; message: string }[]>([]);
  const [ storedName, setStoredName ] = useState(() => localStorage.getItem("storedName") as string)
  const [ rooms, setRooms ] = useState<[]>([]);
  const [ dropdown, setDropdown ] = useState(false);
  const [ newRoom, setNewRoom] = useState(false);
  const [ joined, setJoined ] = useState(false);

const { name, setName, roomName, setRoomName, storedId, setStoredId} = useContext(UserContext);
  
  

  const navigate = useNavigate();

  const image = require('../../assets/profissao-programador-logo.jpg');
  const sendicon = require('../../assets/send.png');
  const wallpaper = require('../../assets/zap-bg.png');

  const handleDropDown = () => {
    setDropdown(true);
  }


  useEffect(() => { 
    if ((name && roomName)) {
      io.emit("join", name, roomName); 
      console.log("Join foi emitdo");   
    } 
    
    io.on("users", (users: User[]) => {
      setUsers(users);
      console.log("Users foi emitido");
      console.log(users.map(user => user.id));
    });
    
    io.on("rooms",(rooms) => {
      setRooms(rooms)
    });
  
    return () => {
      io.off("users");
      io.off("rooms");
    }
  }, [name, roomName]);
  


useEffect(() => {
  io.on("message",(data) => {
    const { message, name, roomName: messageRoom } = data;

    if (messageRoom === roomName) {
      setMessages((prevMessages) => [...prevMessages, { message, name }]);
    }
  });
  
  return () => {
    io.off("message")
  }
}, [roomName]);




  const handleMessage = () => {
    if(message && roomName){
      io.emit("message", {message, name, roomName});
      setMessage("");
      console.log(users.map(user => user.name));
      
      
      console.log(message)
    }
  }

  const handlereload = () => {
    navigate('/createnewroom');
    window.location.reload();
    console.log(name, roomName, storedId, storedName)
  }
  


  return (
    <Container>
      <div className='back-ground'></div>
      <div className='chat-container'>

        <div className='chat-contacts'>
          <div className='chat-options'></div>
        {rooms.map((room, index) => (
          <div className='chat-item' style={{border: "solid red 1px"}}>
            <img src={image} className='image-profile' alt='' />
                <div className='title-chat-container' >
            <span  key={index} className='title-message'>{room}</span>
                <span className='last-message'>
                {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
                </span>
            </div>
          </div>

        ))}
        </div>

        <div style={{backgroundImage: `url(${wallpaper})`}} className='chat-messages'>
          <div className='chat-options'>
          <div className='chat-item'>
              <img  src={image} className='image-profile' alt=''/>
              <div className='title-chat-container'>
                <span className='title-message'>NetWorking: Programador</span>
                <span className='last-message'>
                  {users.map((user, index) => (
                    <span key={user.id}>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                  ))}
                </span>
              </div>
              <button className='drop' onClick={() => {handlereload(); navigate('/createnewroom');}}>Criar Sala</button>
            </div>
          </div>
          
          <div   className='chat-messages-area'>
                  {messages.map((message, index) => (
                    <div className={message.name === name? 'user-container-message right' : 'user-container-message left'}>
                      <div key={index} className={message.name === name? 'user-my-message' : 'user-other-message'}>
                        <span className='user-name-message'>{message.name === name? '' : `${message.name}`}</span> 
                        <span className='user-message'>{message.message}</span>
                      </div>
                    </div>
                  ))}
          </div>

          <div className='chat-input-area'>
            <input
            onKeyDown={(e) => {if (e.key === "Enter") handleMessage();}} 
            className='chat-input'
            placeholder='Mensagem'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <img src={sendicon} alt='' className='send-message-icon' onClick={() => handleMessage()}/>
          </div>
        </div>

      </div>
    </Container>
  );
}

export default Chat;



// Ao criar nova sala os dados estão se mantendo (tudo bem sumir as mensagens);
// Mensagens só sendo enviadas para aquela sala e só quem está naquela sala recebe elas;
// Está sendo possível transitar entre salas clicando nelas;
// É possível fixar as conversas no topo;
// Mostrando quantidade de mensagens não lidas;
// Tela de inserção de Nome e Sala com design moderno e atraente mostrando e agregando valor no projeto;