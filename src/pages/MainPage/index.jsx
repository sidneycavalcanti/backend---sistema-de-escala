import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./style.css";
import NavBar from "./NavBar";
import axios from "axios";

function MainPage() {
  const [dadosMilitar, setDadosMilitar] = useState([]);
  //const [atualizarMilitar, setAtalizarMilitar] = useState();
  const [registros, setRegistros] = useState([]);
  const [registroAtual, setRegistroAtual] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/servicos")
      .then((response) => {
        setRegistros(response.data);
      })
      .catch((err) => {
        console.error("Não foi possivel obter os dados do servidor:", err);
      });
  }, []);

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
      //id: Date.now(),
      data: event.target.date.value,

      oficial_id: event.target.oficial.value,
      sgtdia_id: event.target.sgt.value,
      cbgd_id: event.target.cb.value,
      moto_id: event.target.moto.value,
      parmcav_id: event.target.baia.value,

      frente1_id: event.target.frente1.value,
      frente2_id: event.target.frente2.value,
      frente3_id: event.target.frente3.value,

      tras1_id: event.target.tras1.value,
      tras2_id: event.target.tras2.value,
      tras3_id: event.target.tras3.value,

      aloj1_id: event.target.alojamento1.value,
      aloj2_id: event.target.alojamento2.value,
      aloj3_id: event.target.alojamento3.value,

      garagem1_id: event.target.garagem1.value,
      garagem2_id: event.target.garagem2.value,
      garagem3_id: event.target.garagem3.value,
    };
    const atualizarMilitar = {
      dtultimosv: event.target.date.value,
      ultfunc:  event.target.name,
      qtddiaf: 0,
    }

    try {
      console.log(atualizarMilitar)
      // await axios.post("http://localhost:5000/servicos", novoRegistro, {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // });
     
      await axios.put(`http://localhost:5000/militares/${
        event.target.oficial.value,
        event.target.sgt.value,
        event.target.cb.value,
        event.target.moto.value,
        event.target.baia.value,
  
        event.target.frente1.value,
        event.target.frente2.value,
        event.target.frente3.value,
  
        event.target.tras1.value,
        event.target.tras2.value,
        event.target.tras3.value,
  
        event.target.alojamento1.value,
        event.target.alojamento2.value,
        event.target.alojamento3.value,
  
        event.target.garagem1.value,
        event.target.garagem2.value,
        event.target.garagem3.value
      }`, atualizarMilitar, {
      headers: {
        "Content-type": "application/json",
      },
    });

      window.alert("Cadastro efetuado com sucesso!");
      setRegistros([...registros, registroAtual]);
      event.target.reset();
      window.location.reload(true);
    } catch (error) {
      console.error("Erro ao criar registro:", error);
    }
  };

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir essa escala?"
    );
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/servicos/${id}`);
      const novosRegistros = registros.filter((registro) => registro.id !== id);
      setRegistros(novosRegistros);
    }
  }

  const buscarRegistro = async (id) => {
    const response = await axios.get(`http://localhost:5000/servicos/${id}`);
    setRegistroAtual(response.data);
    setIsModalOpen2(true);
  };

  const confirmaEdicao = async () => {
    // // Buscar os dados passando id
    const editRegistro = {
      data: document.getElementById("date").value,
      oficial_id: document.getElementById("oficial").value,
      sgtdia_id: document.getElementById("sgt").value,
      cbgd_id: document.getElementById("cb").value,
      moto_id: document.getElementById("moto").value,
      parmcav_id: document.getElementById("baia").value,
      frente1_id: document.getElementById("frente1").value,
      frente2_id: document.getElementById("frente2").value,
      frente3_id: document.getElementById("frente3").value,
      tras1_id: document.getElementById("tras1").value,
      tras2_id: document.getElementById("tras2").value,
      tras3_id: document.getElementById("tras3").value,
      aloj1_id: document.getElementById("alojamento1").value,
      aloj2_id: document.getElementById("alojamento2").value,
      aloj3_id: document.getElementById("alojamento3").value,
      garagem1_id: document.getElementById("garagem1").value,
      garagem2_id: document.getElementById("garagem2").value,
      garagem3_id: document.getElementById("garagem3").value,
    };
    try {
      console.log(editRegistro);
      // Faz a requisição PUT enviando os dados a serem atualizados no corpo da requisição
      axios.put(
        `http://localhost:5000/servicos/${registroAtual.id}`,
        editRegistro
      );
      setIsModalOpen2(false);
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
    setIsModalOpen2(false);
  }
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="cadastro">
          <button className="adicionar" onClick={() => setIsModalOpen1(true)}>
            Adicionar serviço
          </button>
          <h3>Lista de Serviços</h3>

          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Data</th>
                <th>Oficial</th>
                <th>Sgt de dia</th>
                <th>Cabo da guarda</th>
                <th>Motorista</th>
                <th>Baiero</th>
                <th>Sentinelas pavilhão</th>
                <th>Sentinelas rancho</th>
                <th>Plantão do alojamento</th>
                <th>Plantão da garagem</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.data}</td>
                  <td>
                    {registro.oficialId.grad} - {registro.oficialId.name}
                  </td>
                  <td>
                    {registro.sgtdiaId.grad} - {registro.sgtdiaId.name}
                  </td>
                  <td>
                    {registro.cbgdId.grad} - {registro.cbgdId.name}
                  </td>
                  <td>
                    {registro.motoId.grad} - {registro.motoId.name}
                  </td>
                  <td>
                    {registro.parmcavId.grad} - {registro.parmcavId.name}
                  </td>
                  <td>
                    {registro.frente1Id.grad} -{registro.frente1Id.name}
                    <br />
                    {registro.frente2Id.grad} {registro.frente2Id.name}
                    <br />
                    {registro.frente3Id.grad} {registro.frente3Id.name}
                  </td>
                  <td>
                    {registro.tras1Id.grad} {registro.tras1Id.name}
                    <br />
                    {registro.tras2Id.grad} {registro.tras2Id.name}
                    <br />
                    {registro.tras3Id.grad} {registro.tras3Id.name}
                  </td>
                  <td>
                    {registro.aloj1Id.grad} {registro.aloj1Id.name}
                    <br />
                    {registro.aloj1Id.grad} {registro.aloj1Id.name}
                    <br />
                    {registro.aloj1Id.grad} {registro.aloj1Id.name}
                  </td>
                  <td>
                    {registro.garagem1Id.grad} {registro.garagem1Id.name}
                    <br />
                    {registro.garagem2Id.grad} {registro.garagem2Id.name}
                    <br />
                    {registro.garagem3Id.grad} {registro.garagem3Id.name}
                  </td>
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
            isOpen={isModalOpen1}
            onRequestClose={handleModalClose}
          >
            <form className="formMainPage" onSubmit={handleSubmit}>
              <h2>Cadastrar serviço</h2>
              <div className="">
                <label className="labelMainPage" htmlFor="date">
                  Dia do serviço
                </label>
                <input
                  className="inputMainPage"
                  type="date"
                  id="date"
                  name="date"
                  required
                />
              </div>
              <div>
                <div className="gridMainPage5">
                  <div>
                    <label className="labelMainPage" htmlFor="oficial">
                      Oficial de dia:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="oficial"
                      name="oficial"
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="sgt">
                      Sargento de dia:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="sgt"
                      name="sgt de dia"
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="cb">
                      Cabo da gd:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="cb"
                      name="cb"
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="moto">
                      Motorista:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="moto"
                      name="moto"
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="moto">
                      Parm à cavalariça:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="baia"
                      name="baia"
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="gridMainPage4">
                  <div>
                    <label className="labelMainPage" htmlFor="email">
                      Sentinela pavilhão
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="frente1"
                      name="frente1"
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="tras1">
                      Sentinela rancho
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras1"
                      name="tras1"
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="alojamento1">
                      Plantão alojamento
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="alojamento1"
                      name="alojamento1"
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="garagem1">
                      Plantão garagem
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="garagem1"
                      name="garagem1"
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="frente2"
                      name="frente2"
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="tras2"
                      name="tras2"
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="alojamento2"
                      name="alojamento2"
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="garagem2"
                      name="garagem2"
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="frente3"
                      name="frente3"
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="tras3"
                      name="tras3"
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="alojamento3"
                      name="alojamento3"
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="garagem3"
                      name="garagem3"
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
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
            isOpen={isModalOpen2}
            onRequestClose={handleModalClose}
          >
            <form className="formMainPage" onSubmit={confirmaEdicao}>
              <h2>Atualizar serviço</h2>
              <div className="">
                <label className="labelMainPage" htmlFor="date">
                  Dia do serviço
                </label>
                <input
                  className="inputMainPage"
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={registroAtual.data}
                  required
                />
              </div>
              <div>
                <div className="gridMainPage5">
                  <div>
                    <label className="labelMainPage" htmlFor="oficial">
                      Oficial de dia:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="oficial"
                      name="oficial"
                      defaultValue={registroAtual.oficial_id}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="sgt">
                      Sargento de dia:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="sgt"
                      name="sgt"
                      defaultValue={registroAtual.sgtdia_id}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="cb">
                      Cabo da gd:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="cb"
                      name="cb"
                      defaultValue={registroAtual.cbgd_id}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="moto">
                      Motorista:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="moto"
                      name="moto"
                      defaultValue={registroAtual.moto_id}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="moto">
                      Parm à cavalariça:
                    </label>
                    <select
                      className="inputMainPage"
                      type="number"
                      id="baia"
                      name="baia"
                      defaultValue={registroAtual.parmcav_id}
                      required
                    >
                      <option value="" disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="gridMainPage4">
                  <div>
                    <label className="labelMainPage" htmlFor="email">
                      Sentinela pavilhão
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="frente1"
                      name="frente1"
                      defaultValue={registroAtual.frente1_id}
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="tras1">
                      Sentinela rancho
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras1"
                      name="tras1"
                      defaultValue={registroAtual.tras1_id}
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="alojamento1">
                      Plantão alojamento
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="alojamento1"
                      name="alojamento1"
                      defaultValue={registroAtual.aloj1_id}
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="labelMainPage" htmlFor="garagem1">
                      Plantão garagem
                    </label>
                    <select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="garagem1"
                      name="garagem1"
                      defaultValue={registroAtual.garagem1_id}
                      required
                    >
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="frente2"
                      name="frente2"
                      defaultValue={registroAtual.frente2_id}
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="tras2"
                      name="tras2"
                      defaultValue={registroAtual.tras2_id}
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="alojamento2"
                      name="alojamento2"
                      defaultValue={registroAtual.aloj2_id}
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Segundo quarto"
                      type="number"
                      id="garagem2"
                      name="garagem2"
                      defaultValue={registroAtual.garagem2_id}
                      required
                    >
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="frente3"
                      name="frente3"
                      defaultValue={registroAtual.frente3_id}
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="tras3"
                      name="tras3"
                      defaultValue={registroAtual.tras3_id}
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="alojamento3"
                      name="alojamento3"
                      defaultValue={registroAtual.aloj3_id}
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="inputMainPage"
                      placeholder="Terceiro quarto"
                      type="number"
                      id="garagem3"
                      name="garagem3"
                      defaultValue={registroAtual.garagem3_id}
                      required
                    >
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.grad} - {item.name}
                        </option>
                      ))}
                    </select>
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

export default MainPage;
