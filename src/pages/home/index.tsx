import { useEffect, useState, } from 'react';
import  socket  from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';


type IProps = {
    message: string;
    name: string;
    roomName: string;
    room: any;
    joined: any;
    newroom: any;
}

const io = socket('http://localhost:4000');

function Home() {
  const [ name, setName ] = useState('');
  const [ joined, setJoined ] = useState(false);
  const [ rooms, setRooms ] = useState([]);
  const [ roomName, setRoomName] = useState('');
  const [ users, setUsers ] = useState([]);
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState<IProps[]>([]);
  const [activeRoom, setActiveRoom] = useState();

  const navigate = useNavigate();

  const image = require('../../assets/profissao-programador-logo.jpg');
  const sendicon = require('../../assets/send.png')

  useEffect(() => {
    io.on("users", (users) => setUsers(users));
    io.on("room", (rooms) => {
      console.log("Rooms recebidas:", rooms);
    setRooms(rooms)})
    io.on("message",(message) => setMessages((messages) => [...messages, message]));
  }, []);


  const handleJoin = () => {
    console.log(name, rooms)

    if(name || roomName) {
      io.emit("join", name, roomName);
      setJoined(true);
    }
  }

  const handleMessage = () => {
    if(message){
      io.emit("message", {message, name, roomName});
      setMessage("");
    }
  }

  const switchRoom = (newRoom: any) => {
    if (newRoom !== roomName) {
      // Sai da sala atual
      io.emit("leave", roomName);
  
      // Atualiza a sala ativa
      setRoomName(newRoom);
       // Limpa as mensagens ao trocar de sala
  
      // Entra na nova sala
      io.emit("join", name, newRoom);
      setActiveRoom(newRoom); // Atualiza a sala ativa
    }
  };

  const handleLogout = () => {
    // Emite o evento 'leave' para o backend
    io.emit("leave", roomName);
  
    // Desconecta o socket manualmente
    io.disconnect();
  
    // Limpa o estado no frontend
    setName('');
    setRoomName('');
    setJoined(false);
    setMessages([]);
    setUsers([]);
  };

  if (!joined) {
    return (
      <div>
        <span>Digite seu nome</span>
        <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') handleJoin();}}/>
        <span>Nome da sala</span>
        <input  value={roomName} onChange={(e) => setRoomName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleJoin()}}/>  
        <button onClick={() =>handleJoin()}>Entrar</button>
      </div>
    )
  }


  return (
    <Container>
      <div className='back-ground'></div>
      <div className='chat-container'>

        <div className='chat-contacts' style={{border: 'solid 1px red'}}>
          <div className='chat-options'></div>
              {rooms.map((room: IProps, index) => (
                <>
          <div key={index} className={`chat-item ${room === activeRoom ? 'active' : ''}`} onClick={() => switchRoom(room)}>
            <img  className='image-profile' alt='' />
                <div className='title-chat-container' >
                <span className='title-message'>{roomName}</span>
                <span className='last-message'>
                {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
                </span>
            </div>
          </div>
                </> 
              ))}
        </div>

        <div className='chat-messages'>
          <div className='chat-options'>
          <div className='chat-item'>
              <img  src={image} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>NetWorking: Programador</span>
                <span className='last-message'>
                  {users.map((user: IProps, index) => (
                    <span>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                  ))}
                </span>
              </div>
              <button onClick={handleLogout}>Sair</button>
              <button onClick={() => navigate('/createroom')}>Criar sala</button>
            </div>
          </div>
          
          <div className='chat-messages-area'>
                  {messages.filter(msg => msg.roomName === roomName).map((message, index) => (
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

export default Home;



// criar tela de inserçao de nome 
// melhorar exibiçao do nome no chat - feito
// estudar documentaçao do socket.io principalmete o rooms para criar outros chats

// implementaçao de cadastro e login
// mostrar quantidade de mensagens nao lidas
// ser possivel transitar entre diferentes conversas
// ser possivel fixar uma conversa ao topo