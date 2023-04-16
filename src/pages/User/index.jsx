import React, { useEffect, useState } from "react";
import Modal from "react-modal";
//import './style.css';
import NavBar from "../MainPage/NavBar";
import axios from "axios";

function User() {
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [registroAtual, setRegistroAtual] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setDadosUsuario(response.data);
      })
      .catch((err) => {
        console.error("Não foi possivel obter os dados do servidor:", err);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const novoRegistro = {
      name: event.target.name.value,
      cat: event.target.cat.value,
      password: event.target.password.value,
      passwordConfirmation: event.target.password.value
      
    };
    console.log(novoRegistro)
        try{
            axios.post("http://localhost:5000/users", novoRegistro, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            window.alert("Cadastro efetuado com sucesso!");
            setRegistros([...registros, novoRegistro]);
            event.target.reset();
            window.location.reload(true);
          } catch (error) {
            console.error("Erro ao criar registro:", error);
          }
        };
   
  

  function handleDelete(id) {
    const confirmDelete = window.confirm(
        "Tem certeza que deseja excluir esse usuario?"
      );
      if (confirmDelete) {
        axios.delete(`http://localhost:5000/users/${id}`);
        const novosRegistros = registros.filter((registro) => registro.id !== id);
        setRegistros(novosRegistros);
        // window.location.reload(true);
      }
    }
  
    const buscarRegistro = async (id) => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setRegistroAtual(response.data);
        setIsModalOpen2(true);
    }


  const handleEdit = async () => {

  }

  function handleModalClose() {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  }
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="cadastro">
          <button className="adicionar" onClick={() => setIsModalOpen1(true)}>
            Adicionar usuario
          </button>
          <h3>Lista de Militares</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                {/* <th>Login</th> */}
                <th>Categoria</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {dadosUsuario.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.name}</td>
                  <td>{registro.cat}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => buscarRegistro(registro.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="buttonExcluir"
                      onClick={() => handleDelete(registro.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            className="modal"
            name="modal1"
            isOpen={isModalOpen1}
            onRequestClose={handleModalClose}
          >
            <form className="formMainPage" onSubmit={handleSubmit}>
              <h2>Cadastrar militar</h2>
              <div>
                <div className="gridMainPage3">
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Login de acesso:
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="text"
                      id="name"
                      name="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="password">
                      Senha
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="password"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Categoria:
                    </label>
                    <select
                      className="inputMilitarPage"
                      type="text"
                      id="cat"
                      name="cat"
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      <option>Comum</option>
                      <option>Coordenador</option>
                      <option>Administrador</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="buttonCad" type="submit">
                Cadastrar
              </button>
              <button className="buttonExit" onClick={handleModalClose}>
                Fechar
              </button>
            </form>
          </Modal>
          <Modal
            className="modal"
            name="modal2"
            isOpen={isModalOpen2}
            onRequestClose={handleModalClose}
          >
            <form className="formMainPage" onSubmit={handleSubmit}>
              <h2>Atualizar militar</h2>
              <div>
                <div className="gridMainPage3">
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Login de acesso:
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={registroAtual.name}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="senha">
                      Senha
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="text"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Categoria:
                    </label>
                    <select
                      className="inputMilitarPage"
                      type="text"
                      id="cat"
                      name="cat"
                      defaultValue={registroAtual.cat}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      <option>Comum</option>
                      <option>Coordenador</option>
                      <option>Administrador</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="buttonCad" type="submit">
                {registroAtual.id ? "Atualizar" : "Cadastrar"}
              </button>
              <button className="buttonExit" onClick={handleModalClose}>
                Fechar
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default User;
