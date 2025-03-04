import { Container, FormContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "contexts/usercontext";




function SignIn() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

  const navigate = useNavigate();

  const { handleLogin  } = useContext(UserContext) 
    

    return (
        <Container>
                <FormContainer>
                <span>Email</span>
                <input placeholder="Insira seu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha</span>
                <input placeholder="Insira uma senha forte" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="signin-button"  onClick={() => {handleLogin({ email, password }); navigate('/chat')}} >Logar</button>
                </FormContainer>  
        </Container>
    )
}


export default SignIn;