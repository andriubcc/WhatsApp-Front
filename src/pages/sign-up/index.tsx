import { Container, FormContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "contexts/usercontext";

interface IProps {
    event: any;
    target: any
 }


function SignUp() {
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ userPhoneNumber, setUserPhoneNumber ] = useState("");
    const [ password, setPassword ] = useState("")
    
    const navigate = useNavigate();
    
    const { handleCreateUser} = useContext(UserContext);

    const handleSubmit = () => {
        console.log("Dados enviados:", { name, email, userPhoneNumber, password }); // Verifique os dados aqui
    
        if (!name || !email || !userPhoneNumber || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        handleCreateUser({ name, email, userPhoneNumber, password });
        navigate('/signin');
    };
    
    
   
        
        const handleInputChange = (event: any)  => {
            let value = event.target.value.replace(/\D/g, '');
            
            
            
            if (value.length < 3) {
                setUserPhoneNumber(value);
                return;
            }
            
            
            if (value.length >= 1) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            }
            
            if (value.length < 11) {
                setUserPhoneNumber(value);
                return;
            }
            
            if (value.length > 9) {
                value = `${value.substring(0, 10)}-${value.substring(10, 14)}`
            }
            
            setUserPhoneNumber(value);
            


            console.log(value)
        };

  
    

    return (
        <Container>
                <FormContainer>
                <span>Email</span>
                <input placeholder="Insira seu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha</span>
                <input placeholder="Insira uma senha forte" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span>Nome</span>
                <input placeholder="Insira seu Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <span>Número</span>
                 <input placeholder="Insira seu número de celular" type="text" value={userPhoneNumber} onChange={handleInputChange}/>  {/* Depois adicionar verificaçao de formato de numero */}
                <button className="signup-button" onClick={() => handleSubmit()}>Cadastrar</button>
                <button className="navigate-signin" onClick={() => navigate('/signin')}>Ja possuo conta</button>



                <span> curry@gmail.com / (51) 99999-9999  /   </span>
                </FormContainer>  
        </Container>
    )
}


export default SignUp;