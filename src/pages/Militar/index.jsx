import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

import NavBar from "../MainPage/NavBar";
import axios from "axios";

const Militar = () => {
  const [dadosGrad, setDadosGrad] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [registroAtual, setRegistroAtual] = useState([]);
  const [name, setName] = useState("");
  const [grad, setGrad] = useState("");
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  //trazer todos os militares e colocar no setRegistro
  useEffect((id) => {
    axios
      .get("http://localhost:5000/militares")
      .then((response) => {
        setRegistros(response.data);
      })
      .catch((err) => {
        console.error("Não foi possivel obter os dados do servidor:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/grads")
      .then((response) => {
        setDadosGrad(response.data);
      })
      .catch((err) => {
        console.error("Não foi possivel obter os dados do servidor:", err);
      });
  }, []);

  //trazer todos as graduações e colocar no setDadosGrad


  const handleNomeChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setGrad(event.target.value);
  };

  const handlePesquisa = async (event) => {
    event.preventDefault();
    const nomePesquisa = name;
    const gradPesquisa = grad;
    try {
      
      const response = await axios.get(
        `http://localhost:5000/militares?name=${nomePesquisa}&grad=${gradPesquisa}`
      );
      console.log(response.data);
      setRegistros(response.data);
     
    } catch (error) {
      console.error(error);
    }
  };

  const handleLimpar = () => {
    setName("");
    setGrad("");
  };

  const handleLimparPesquisa = () => {
    // aqui você pode limpar os resultados da pesquisa
  };

  const handlePesquisaKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handlePesquisa();
    }
  };

  const handleLimparKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLimpar();
      handleLimparPesquisa();
    }
  };
  
  //Cadastrar Militar no banco de dados
  const handleSubmit = async (event) => {
    const novoRegistro = {
      idt: event.target.idt.value,
      grad: event.target.grad.value,
      name: event.target.name.value,
      num: event.target.num.value,
      dtultimosv: event.target.dtultimosv.value,
      qtddiaf: event.target.qtddiaf.value,
    };

    console.log(novoRegistro);

    try {
      await axios.post("http://localhost:5000/militares", novoRegistro, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRegistros([...registros, novoRegistro]);
      event.target.reset();
    } catch (error) {
      console.error("Erro ao criar registro:", error);
    }
    window.alert("Cadastro efetuado com sucesso!");
    // window.location.reload(true)
  };

  //Deletetar Militar do banco de dados
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este Militar?"
    );
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/militares/${id}`).then(() => {
        const novosRegistros = registros.filter(
          (registro) => registro.id !== id
        );
        setRegistros(novosRegistros);
      });
    }
    // window.location.reload(true);
  };

  const atualizarSituacao = async (id) => {
    const militar = await axios.get(`http://localhost:5000/militares/${id}`);
    const botao = document.getElementById(`situacao-${id}`);
    let novaSituacao = false;
    if (militar.data.situacao === false) {
      novaSituacao = true;
      // botao.style.backgroundColor = 'red';
      botao.classList.remove("btn-success");
      botao.classList.add("btn-danger");
      botao.innerHTML = "Inativo";
    } else {
      // botao.style.backgroundColor = 'green';
      botao.classList.remove("btn-danger");
      botao.classList.add("btn-success");
      botao.innerHTML = "Ativo";
    }
    const edite = {
      situacao: novaSituacao,
    };
    const response = await axios.put(
      `http://localhost:5000/militares/${id}`,
      edite
    );
    // window.location.reload(true);
  };

  const buscarRegistro = async (id) => {
    const response = await axios.get(`http://localhost:5000/militares/${id}`);
    setRegistroAtual(response.data);
    setIsModalOpen2(true);
  };

  const confirmaEdicao = async (event) => {
    // // Buscar os dados passando id

    const editRegistro = {
      idt: event.target.idt.value,
      grad: event.target.grad.value,
      name: event.target.name.value,
      num: event.target.num.value,
      dtultimosv: event.target.dtultimosv.value,
      qtddiaf: event.target.qtddiaf.value,
    };
    try {
      // Faz a requisição PUT enviando os dados a serem atualizados no corpo da requisição
      axios.put(
        `http://localhost:5000/militares/${registroAtual.id}`,
        editRegistro
      );
      setRegistroAtual([...registroAtual, editRegistro]);
      window.alert("atualização efetuado com sucesso!");
    } catch (error) {
      window.alert(error);
      console.error("Erro ao editar registro:", error);
    }
  };

  const handleModalClose = async () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
    // window.location.reload(true);
  };

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
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Pesquisar Militares</h2>
          </div>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-5">
                  <Form.Control
                    placeholder="Nome"
                    type="text"
                    value={name}
                    onChange={handleNomeChange}
                    onKeyDown={handlePesquisaKeyDown}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-5">
                  <Form.Select
                    className="row"
                    value={grad}
                    onChange={handleCategoriaChange}
                  >
                    <option value="" selected>
                      Selecione...
                    </option>
                    {dadosGrad.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant="success"
                    // type="submit"
                    onClick={handlePesquisa}
                    onKeyDown={handlePesquisaKeyDown}
                  >
                    Pesquisar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleLimpar}
                    onKeyDown={handleLimparKeyDown}
                  >
                    Limpar
                  </Button>
                </div>
              </Col>
            </Row>
            <Col></Col>
          </Form>
        </div>
      </div>
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
                  <>
                    <thead>
                      <tr>
                        <th>Graduação</th>
                        <th>Nome de guerra</th>
                        <th>Quantidade de serviço</th>
                        <th>Ultimo dia de serviço</th>
                        <th>Dias folgando</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros.map((registro) => (
                        <tr key={registro.id}>
                          <td>{registro.gradId.name}</td>
                          <td>{registro.name}</td>
                          <td>{registro.qtdsv}</td>
                          <td>{registro.dtultimosv}</td>
                          <td>{registro.qtddiaf}</td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <Button
                                id={`situacao-${registro.id}`}
                                variant={
                                  registro.situacao ? "danger" : "success"
                                }
                                onClick={() => atualizarSituacao(registro.id)}
                              >
                                {registro.situacao ? "Inativo" : "Ativo"}
                              </Button>
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
                      ))}
                    </tbody>
                  </>
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
                  <Form onSubmit={handleSubmit}>
                    <Modal.Body className="show-grid">
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Numero do Militar</Form.Label>
                            <Form.Control
                              type="number"
                              id="num"
                              name="num"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Identidade Militar</Form.Label>
                            <Form.Control
                              type="number"
                              id="idt"
                              name="idt"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Graduação</Form.Label>
                            <Form.Select
                              type="number"
                              id="grad"
                              name="grad"
                              required
                            >
                              <option value="" selected>
                                Selecione...
                              </option>
                              {dadosGrad.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Nome de guerra</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              name="name"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Data do ultimo serviço</Form.Label>
                            <Form.Control
                              type="date"
                              id="dtultimosv"
                              name="dtultimosv"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Dias folgando</Form.Label>
                            <Form.Control
                              type="number"
                              id="qtddiaf"
                              name="qtddiaf"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="success" type="submit">
                        Cadastrar
                      </Button>
                      <Button variant="danger" onClick={handleModalClose}>
                        Fechar
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>

                {/* modal de editar  */}
                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={isModalOpen2}
                  onHide={handleModalClose}
                  className="modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Atualizar Militar
                    </Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={confirmaEdicao}>
                    <Modal.Body className="show-grid">
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Numero do Militar</Form.Label>
                            <Form.Control
                              type="number"
                              id="num"
                              name="num"
                              required
                              defaultValue={registroAtual.num}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Identidade Militar</Form.Label>
                            <Form.Control
                              type="number"
                              id="idt"
                              name="idt"
                              required
                              defaultValue={registroAtual.idt}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Graduação</Form.Label>
                            <Form.Select
                              type="number"
                              id="grad"
                              name="grad"
                              required
                              defaultValue={registroAtual.grad}
                            >
                              <option value="" disabled selected>
                                Selecione...
                              </option>
                              {dadosGrad.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Nome de guerra</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              name="name"
                              required
                              defaultValue={registroAtual.name}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Data do ultimo serviço</Form.Label>
                            <Form.Control
                              type="date"
                              id="dtultimosv"
                              name="dtultimosv"
                              required
                              defaultValue={registroAtual.dtultimosv}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Dias folgando</Form.Label>
                            <Form.Control
                              type="number"
                              id="qtddiaf"
                              name="qtddiaf"
                              required
                              defaultValue={registroAtual.qtddiaf}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="success" type="submit">
                        Atualizar
                      </Button>
                      <Button variant="danger" onClick={handleModalClose}>
                        Fechar
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Militar;
