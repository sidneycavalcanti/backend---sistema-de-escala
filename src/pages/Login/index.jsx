import React, { useState } from 'react';
import axios from "axios";

import './style.css';
import Logo from '../../assets/logo cimnc.png'

function Login() {

  const [idt, setIdt] = useState ('');
  const [password, setPassword] = useState ('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  try {
    const response = await axios.get('http://localhost:5000/sessions', {
      idt,
      password,
    });
      if (response.data.success) {
        // Confirmação do backend recebida com sucesso, prossegue com a execução
        console.log('Login realizado com sucesso!');
      } else {
        // Caso contrário, exibe uma mensagem de erro
        console.log('Email ou senha incorretos.');
      }
    } catch (error) {
      // Trata possíveis erros de conexão com o backend
      console.error(error);
    }
  };

  return (
    <div className="login-container">
    
    <form className='formlogin' onSubmit={handleSubmit}> 
    <img src={Logo} width="100"/>
    <h1>SisEscala</h1>
      <label className='labellogin'>
        <input
        id="idt"
        value={idt}
        className='inputlogin' 
        placeholder='Identidade Militar' 
        type="number"
        onChange={(event) => setIdt(event.target.value)}
        />
      </label>
      <label className='labellogin'>
        <input 
        id="password"
        value={password}
        className='inputlogin'
        placeholder='Senha' 
        type="password"
        onChange={(event) => setPassword(event.target.value)}  
        />
      </label>
      <button 
      className='buttonlogin' 
      type="submit">
        Entrar
      </button>
    </form>
  </div>
  );
}

export default Login;
