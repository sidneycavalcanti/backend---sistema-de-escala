import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Pagination } from "react-bootstrap";
import NavBar from "../MainPage/NavBar";
import axios from "axios";

const Militar = () => {
  const [dadosGrad, setDadosGrad] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [registroAtual, setRegistroAtual] = useState({});
  const [name, setName] = useState("");
  const [grad, setGrad] = useState("");
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const token = localStorage.getItem("token");

  //trazer todos os militares e colocar no setRegistro
  useEffect(() => {
    fetchRegistros();
  }, [currentPage]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/grads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDadosGrad(response.data);
      })
      .catch((err) => {
        console.error("Não foi possivel obter os dados do servidor:", err);
      });
  }, []);

  //trazer todos as graduações e colocar no setDadosGrad
  const fetchRegistros = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/militares?page=${currentPage}&name=${name}&grad=${grad}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegistros(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        axios
          .get(`http://localhost:5000/militares?page=${totalPages}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setRegistros(response.data.data);
            setCurrentPage(totalPages);
          })
          .catch((err) => {
            console.error("Não foi possivel obter os dados do servidor:", err);
          });
      } else {
        console.error("Não foi possivel obter os dados do servidor:", err);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNomeChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setGrad(event.target.value);
  };

  const handlePesquisa = async (event) => {
    const nomePesquisa = name;
    const gradPesquisa = grad;
    try {
      const response = await axios.get(
        `http://localhost:5000/militares?name=${nomePesquisa}&grad=${gradPesquisa}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegistros(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        axios
          .get(`http://localhost:5000/militares?page=${totalPages}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setRegistros(response.data.data);
            setCurrentPage(totalPages);
          })
          .catch((err) => {
            console.error("Não foi possivel obter os dados do servidor:", err);
          });
      } else {
        console.error("Não foi possivel obter os dados do servidor:", err);
      }
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
      
      dtultimosvpre: event.target.dtultimosvpre.value,
      dtultimosverm: event.target.dtultimosverm.value,

      qtddiaf: event.target.qtddiaf.value,
      qtddiafvermelha: event.target.qtddiafvermelha.value,

    };

    console.log(novoRegistro);

    try {
      await axios.post("http://localhost:5000/militares", novoRegistro, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      axios
        .delete(`http://localhost:5000/militares/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          const novosRegistros = registros.filter(
            (registro) => registro.id !== id
          );
          setRegistros(novosRegistros);
        });
    }
    // window.location.reload(true);
  };

  const atualizarSituacao = async (id) => {
    const militar = await axios.get(`http://localhost:5000/militares/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    await axios.put(`http://localhost:5000/militares/${id}`, edite, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // window.location.reload(true);
  };

  const buscarRegistro = async (id) => {
    const response = await axios.get(`http://localhost:5000/militares/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
      await axios.put(
        `http://localhost:5000/militares/${registroAtual.id}`,
        editRegistro,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegistroAtual({ ...registroAtual, editRegistro });
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
                        <th>Numero</th>
                        <th>Graduação</th>
                        <th>Nome de guerra</th>
                        <th>Ultimo serviço preta</th>
                        <th>Dias de folga da preta</th>
                        <th>Ultimo serviço vermelha</th>
                        <th>Dias de folga da vermelha</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros ? (
                        registros.map((registro) => (
                          <tr key={registro.id}>
                            <td>{registro.num}</td>
                            <td>{registro.gradId.name}</td>
                            <td>{registro.name}</td>
                            <td>{registro.dtultimosvpre}</td>
                            <td>{registro.qtddiaf}</td>
                            <td>{registro.dtultimosverm}</td>
                            <td>{registro.qtddiafvermelha}</td>
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
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">Nenhum registro encontrado.</td>
                        </tr>
                      )}
                    </tbody>
                  </>
                </table>
                <div></div>
                {/* Paginacao */}

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
                            <Form.Label>Data do ultimo serviço preta</Form.Label>
                            <Form.Control
                              type="date"
                              id="dtultimosvpre"
                              name="dtultimosvpre"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Dias folgando preta</Form.Label>
                            <Form.Control
                              type="number"
                              id="qtddiaf"
                              name="qtddiaf"
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
                            <Form.Label>Data do ultimo serviço vermelha</Form.Label>
                            <Form.Control
                              type="date"
                              id="dtultimosverm"
                              name="dtultimosverm"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Dias folgando vermelha</Form.Label>
                            <Form.Control
                              type="number"
                              id="qtddiafvermelha"
                              name="qtddiafvermelha"
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
                            <Form.Label>Data do ultimo serviço preta</Form.Label>
                            <Form.Control
                              type="date"
                              id="dtultimosvpre"
                              name="dtultimosvpre"
                              required
                              defaultValue={registroAtual.dtultimosvpre}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Dias folgando preta</Form.Label>
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
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Data do ultimo serviço vermelha</Form.Label>
                            <Form.Control
                              type="date"
                              id="dtultimosverm"
                              name="dtultimosverm"
                              required
                              defaultValue={registroAtual.dtultimosverm}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Dias folgando vermelha</Form.Label>
                            <Form.Control
                              type="number"
                              id="qtddiafvermelha"
                              name="qtddiafvermelha"
                              required
                              defaultValue={registroAtual.qtddiafvermelha}
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
      <br></br>

      <Pagination size="lg" className="justify-content-center">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={currentPage === page + 1}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      <h3 className="text-center">Pagina</h3>
    </>
  );
};

export default Militar;
