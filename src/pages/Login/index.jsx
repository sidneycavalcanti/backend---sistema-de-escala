import React, { useState } from "react";
import axios from "axios";

import "./sign-in.css";
import Logo from "../../assets/logo.png";

function Login() {
  const [idt, setIdt] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const dados = {
      idt: event.target.idt.value,
      password: event.target.password.value,
    }
    console.log(dados)
    try {
      const response = await axios.get("http://localhost:5000/sessions", dados, {
        headers: {
          "Content-type": "application/json",
        },
      });

      const { token } = response.data;

      console.log({ token });

      localStorage.setItem('token', token);



      if (response.data.success) {
        // Confirmação do backend recebida com sucesso, prossegue com a execução
        console.log("Login realizado com sucesso!");
      } else {
        // Caso contrário, exibe uma mensagem de erro
        console.log("Email ou senha incorretos.");
      }
    } catch (error) {
      // Trata possíveis erros de conexão com o backend
      console.error(error);
    }
  };

  return (
    <>
    <div className="imagemFundo">
      <div className="container-login">
        <div className="text-center">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleLogin}>
              <img className="mb-4" src={Logo} alt="" width="72" height="85" />
              <h1 className="h3 mb-3 fw-normal">SisEscala</h1>

              <div className="form-floating">
                <input
                  type="text"
                  value={idt}
                  className="form-control"
                  id="idt"
                  placeholder="identidade militar"
                  onChange={(event) => setIdt(event.target.value)}          
                />
                <label htmlFor="floatingInput">Nome</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}  
                />
                <label htmlFor="floatingPassword">Senha</label>
              </div>

              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Lembrar me
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Entrar
              </button>
              <p className="mt-5 mb-3 text-body-secondary">&copy; Desenvolvido por 3ºSgt Sidney - 2023</p>
            </form>
          </main>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
