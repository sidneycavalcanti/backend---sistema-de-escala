import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

import NavBar from "../MainPage/NavBar";
import axios from "axios";

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
      window.location.reload(true);
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
      idt: document.getElementById("idt").value,
      grad: document.getElementById("grad").value,
      name: document.getElementById("name").value,
      num: document.getElementById("num").value,
      dtultimosv: document.getElementById("dtultimosv").value,
      ultfunc: document.getElementById("ultfunc").value,
      qtddiaf: document.getElementById("qtddiaf").value,
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

  let contador = 0;
  let ultimaAtualizacao = new Date();

  function atualizarContador() {
    const agora = new Date();
    const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
    const diferencaEmMilissegundos = agora - ultimaAtualizacao;

    if (diferencaEmMilissegundos >= umDiaEmMilissegundos) {
      contador++;
      ultimaAtualizacao = agora;
    }

    console.log(`${contador}`);
  }

  setTimeout(() => {
    atualizarContador();
  }, 24 * 60 * 60 * 1000);

  return (
    <>
      <NavBar />
      <br></br>
      <div className="tabela">
        <Button variant="primary" onClick={() => setIsModalOpen1(true)}>
          Adicionar militar
        </Button>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Lista de Militares</h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-container table-wrap">
                <table
                  className="table myaccordion table-hover text-center nowrap"
                  id="accordion"
                  responsive="lg"
                >
                  {dadosMilitar.map((registro) => (
                    <>
                      <thead>
                        <tr>
                          <th>Numero</th>
                          <th>Identidade</th>
                          <th>Graduação</th>
                          <th>Nome de guerra</th>
                          <th>Quantidade de serviço</th>
                          <th>Ultimo dia de serviço</th>
                          <th>Dias folgando</th>
                          <th>Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={registro.id}>
                          <td>{registro.num}</td>
                          <td>{registro.idt}</td>
                          <td>{registro.gradId.name}</td>
                          <td>{registro.name}</td>
                          <td>{registro.ultfunc}</td>
                          <td>{registro.dtultimosv}</td>
                          <td>{registro.qtddiaf}</td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <Button
                                variant="primary"
                                onClick={() => buscarRegistro(registro.id)}
                              >
                                Editar
                              </Button>
                              <br></br>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(registro.id)}
                              >
                                Excluir
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  ))}
                </table>

                {/* modal de criar */}
                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={isModalOpen1}
                  onHide={handleModalClose}
                  className="modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Cadastrar Militar
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="show-grid">
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Dia do serviço </Form.Label>
                            <Form.Control
                              type="date"
                              id="date"
                              name="date"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Modal.Body>
                </Modal>

                {/* modal de editar  */}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Militar;
