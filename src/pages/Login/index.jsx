import React, { useState } from "react";
import axios from "axios";

import "./sign-in.css";
import Logo from "../../assets/logo.png";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const dados = {
      name,
      password,
    };
    try {
      const response = await axios.post("http://localhost:5000/sessions", dados, {
        headers: {
          "Content-type": "application/json",
        },
      });
      if(!(localStorage.getItem("token"))){
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", user.name); 
          localStorage.setItem("categoria", user.cat); 
          console.log("Login realizado com sucesso!");
      }
      
    } catch (error) {
      console.error(error);
      console.log("Usuário ou senha incorretos.");
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
                    value={name}
                    className="form-control"
                    id="name"
                    placeholder="Nome"
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="floatingInput">Nome</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    value={password}
                    className="form-control"
                    id="password"
                    placeholder="Senha"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <label htmlFor="floatingPassword">Senha</label>
                </div>

                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Lembrar-me
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