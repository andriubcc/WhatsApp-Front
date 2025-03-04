import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserStorage } from 'contexts/usercontext';
import { DataProvider } from 'contexts/datacontext';
import Chat from 'pages/chat';
import CreateRoom from './pages/createroom';
import CreateNewRoom from 'pages/createnewroom';
import SignIn from 'pages/sign-in';
import SignUp from 'pages/sign-up';


function App() {
  return (
    <BrowserRouter>
    <UserStorage>
    <DataProvider>
    <div className='app' style={{width: "100%"}}>
      <Routes>
        <Route path='/' element={<CreateRoom />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/chat' element={<Chat />}/>
        <Route path='/createnewroom' element={<CreateNewRoom />}/>
      </Routes>
    </div>
    </DataProvider>
    </UserStorage>
    </BrowserRouter>
  );
}

export default App;



// criar tela de inserçao de nome 
// melhorar exibiçao do nome no chat - feito
// estudar documentaçao do socket.io principalmete o rooms para criar outros chats

// implementaçao de cadastro e login
// mostrar quantidade de mensagens nao lidas
// ser possivel transitar entre diferentes conversas
// ser possivel fixar uma conversa ao topo