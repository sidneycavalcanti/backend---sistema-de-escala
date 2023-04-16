import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
//import './style.css';
import NavBar from "../MainPage/NavBar";

function Militar() {
  const [dadosMilitar, setDadosMilitar] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [registroAtual, setRegistroAtual] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/militares")
      .then((response) => {
        setDadosMilitar(response.data);
      })
      .catch((err) => {
        console.error("Não foi possivel obter os dados do servidor:", err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const novoRegistro = {
      idt: event.target.idt.value,
      grad: event.target.grad.value,
      name: event.target.name.value,
      num: event.target.num.value,
      dtultimosv: event.target.dtultimosv.value,
      ultfunc: event.target.ultfunc.value,
      qtddiaf: event.target.qtddiaf.value,
    };

    try {
      await axios.post("http://localhost:5000/militares", novoRegistro, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.alert("Cadastro efetuado com sucesso!");
      setRegistros([...registros, novoRegistro]);
      event.target.reset();
    } catch (error) {
      console.error("Erro ao criar registro:", error);
    }
  };

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir essa escala?"
    );
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/militares/${id}`);
      const novosRegistros = registros.filter((registro) => registro.id !== id);
      setRegistros(novosRegistros);
      window.location.reload(true);
    }
  }

  const buscarRegistro = async (id) => {
    const response = await axios.get(`http://localhost:5000/militares/${id}`);
    setRegistroAtual(response.data);
    setIsModalOpen2(true);
  };

  const confirmaEdicao = async () => {
    // // Buscar os dados passando id
    const editRegistro = {
        idt:  document.getElementById("idt").value,
        grad:  document.getElementById("grad").value,
        name:  document.getElementById("name").value,
        num:  document.getElementById("num").value,
        dtultimosv:  document.getElementById("dtultimosv").value,
        ultfunc:  document.getElementById("ultfunc").value,
        qtddiaf:  document.getElementById("qtddiaf").value,
    };
    try {
      console.log(editRegistro);
      // Faz a requisição PUT enviando os dados a serem atualizados no corpo da requisição
      axios.put(
        `http://localhost:5000/militares/${registroAtual.id}`,
        editRegistro
      );
    //   setIsModalOpen2(false);
      window.location.reload(true);
      // , editRegistro

      // Atualiza o registro atual com os novos dados
      // setRegistroAtual(editRegistro);
      // Abre o modal de edição
    } catch (error) {
      window.alert(error);
      console.error("Erro ao editar registro:", error);
    }
  };

  function handleModalClose() {
    setIsModalOpen1(false);
    window.location.reload(true);
  }
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="cadastro">
          <button className="adicionar" onClick={() => setIsModalOpen1(true)}>
            Adicionar militar
          </button>
          <h3>Lista de Militares</h3>
          <table>
            <thead>
              <tr>
                <th>Identidade</th>
                <th>Graduação</th>
                <th>Nome de guerra</th>
                <th>Numero</th>
                <th>Ultimo dia de serviço</th>
                <th>Ultima função</th>
                <th>Dias folgando</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {dadosMilitar.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.idt}</td>
                  <td>{registro.grad}</td>
                  <td>{registro.name}</td>
                  <td>{registro.num}</td>
                  <td>{registro.dtultimosv}</td>
                  <td>{registro.ultfunc}</td>
                  <td>{registro.qtddiaf}</td>
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
            name="modal 1"
            isOpen={isModalOpen1}
            onRequestClose={handleModalClose}
          >
            <form className="formMainPage" onSubmit={handleSubmit}>
              <h2>Cadastrar militar</h2>
              <div>
                <div className="gridMainPage4">
                  <div>
                    <label className="labelMainPage" htmlFor="oficial">
                      Identidade militar:
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="number"
                      id="idt"
                      name="idt"
                      // defaultValue={registroAtual.idt}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Graduação
                    </label>
                    <select
                      className="inputMilitarPage"
                      type="text"
                      id="grad"
                      name="grad"
                      // defaultValue={registroAtual.grad}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      <option>1º Ten</option>
                      <option>2º Ten</option>
                      <option>1º Sgt</option>
                      <option>2º Sgt</option>
                      <option>3º Sgt</option>
                      <option>Cb</option>
                      <option>Sd Ep</option>
                      <option>Sd Ev</option>
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Nome de guerra:
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="text"
                      id="name"
                      name="name"
                      // defaultValue={registroAtual.name}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="num">
                      Numero:
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="number"
                      id="num"
                      name="num"
                      // defaultValue={registroAtual.num}
                      required
                    />
                  </div>
                </div>
                <div className="gridMainPage3">
                  <div>
                    <label className="labelMainPage" htmlFor="uDia">
                      Data do ultimo serviço:
                    </label>
                    <input
                      className="inputMilitarPage2"
                      type="date"
                      id="dtultimosv"
                      name="dtultimosv"
                      // defaultValue={registroAtual.dtultimosv}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="uFun">
                      Ultima função:
                    </label>
                    <select
                      className="inputMilitarPage"
                      type="text"
                      id="ultfunc"
                      name="ultfunc"
                      // defaultValue={registroAtual.ultfunc}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      <option>Oficial de dia</option>
                      <option>Sgt de dia</option>
                      <option>Cabo da guarda</option>
                      <option>Sentinela Salão</option>
                      <option>Sentinela do rancho</option>
                      <option>Plantão do alojamento</option>
                      <option>Plantão da guaragem</option>
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="dFol">
                      Quantos dias folgando
                    </label>
                    <input
                      className="inputMilitarPage2"
                      type="number"
                      id="qtddiaf"
                      name="qtddiaf"
                      // defaultValue={registroAtual.qtddiaf}
                      required
                    />
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
            name="modal 2"
            isOpen={isModalOpen2}
            onRequestClose={handleModalClose}
          >
            <form className="formMainPage" onSubmit={confirmaEdicao}>
              <h2>Atualizar militar</h2>
              <div>
                <div className="gridMainPage4">
                  <div>
                    <label className="labelMainPage" htmlFor="oficial">
                      Identidade militar:
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="number"
                      id="idt"
                      name="idt"
                      defaultValue={registroAtual.idt}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Graduação
                    </label>
                    <select
                      className="inputMilitarPage"
                      type="text"
                      id="grad"
                      name="grad"
                      defaultValue={registroAtual.grad}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      <option>1º Ten</option>
                      <option>2º Ten</option>
                      <option>1º Sgt</option>
                      <option>2º Sgt</option>
                      <option>3º Sgt</option>
                      <option>Cb</option>
                      <option>Sd Ep</option>
                      <option>Sd Ev</option>
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="name">
                      Nome de guerra:
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
                    <label className="labelMainPage" htmlFor="num">
                      Numero:
                    </label>
                    <input
                      className="inputMilitarPage"
                      type="number"
                      id="num"
                      name="num"
                      defaultValue={registroAtual.num}
                      required
                    />
                  </div>
                </div>
                <div className="gridMainPage3">
                  <div>
                    <label className="labelMainPage" htmlFor="uDia">
                      Data do ultimo serviço:
                    </label>
                    <input
                      className="inputMilitarPage2"
                      type="date"
                      id="dtultimosv"
                      name="dtultimosv"
                      defaultValue={registroAtual.dtultimosv}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="uFun">
                      Ultima função:
                    </label>
                    <select
                      className="inputMilitarPage"
                      type="text"
                      id="ultfunc"
                      name="ultfunc"
                      defaultValue={registroAtual.ultfunc}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      <option>Oficial de dia</option>
                      <option>Sgt de dia</option>
                      <option>Cabo da guarda</option>
                      <option>Sentinela Salão</option>
                      <option>Sentinela do rancho</option>
                      <option>Plantão do alojamento</option>
                      <option>Plantão da guaragem</option>
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="dFol">
                      Quantos dias folgando
                    </label>
                    <input
                      className="inputMilitarPage2"
                      type="number"
                      id="qtddiaf"
                      name="qtddiaf"
                      defaultValue={registroAtual.qtddiaf}
                      required
                    />
                  </div>
                </div>
              </div>

              <button className="buttonCad" type="submit">
                Atualizar
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

export default Militar;
