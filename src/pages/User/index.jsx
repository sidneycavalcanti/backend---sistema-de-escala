import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Pagination } from "react-bootstrap";
import NavBar from "../MainPage/NavBar";
import axios from "axios";

function User() {
  const [registros, setRegistros] = useState([]);
  const [registroAtual, setRegistroAtual] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
   fetchRegistros();
  }, [currentPage]);

  const fetchRegistros = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users?page=${currentPage}&name=${name}`,
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
          .get(`http://localhost:5000/users?page=${totalPages}`, {
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

  const handleNomeChange = (event) => {
    setName(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleLimpar = () => {
    setName("");
  };
  

  const handlePesquisa = async (event) => {
    const nomePesquisa = name;
    try {
      const response = await axios.get(
        `http://localhost:5000/users?name=${nomePesquisa}&page=${currentPage}`,
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

  const  handleSubmit = async (event) => {
    const novoRegistro = {

      name: event.target.name.value,
      cat: event.target.cat.value,
      password: event.target.password.value,
      passwordConfirmation: event.target.confirme.value,

    };

    try {
    await axios.post("http://localhost:5000/users", novoRegistro, {
        headers: {
         Authorization: `Bearer ${token}`,
        },
      });
      setRegistros([...registros, novoRegistro]);
      event.target.reset();
    } catch (error) {
      console.error("Erro ao criar registro:", error);
    }
    window.alert("Cadastro efetuado com sucesso!");
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esse usuario?"
    );
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/users/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      const novosRegistros = registros.filter((registro) => registro.id !== id);
      setRegistros(novosRegistros);
    }
  }

  const buscarRegistro = async (id) => {
    const response = await axios.get(`http://localhost:5000/users/${id}`,{
      headers: {
        Authorization: `Baerer ${token}`,
      }
    });
    setRegistroAtual(response.data);
    setIsModalOpen2(true);
  };

  const confirmaEdicao = async (event) => {
    event.preventDefault();

    // // Buscar os dados passando id
    const editRegistro = {
      name: event.target.name.value,
      cat: event.target.cat.value,
      oldPassword: event.target.oldpassword.value,
      password: event.target.password.value,
      passwordConfirmation: event.target.password.value,
    };
    try {

      // Faz a requisição PUT enviando os dados a serem atualizados no corpo da requisição
      const atualizar = await axios.put(
        `http://localhost:5000/users/${registroAtual.id}`,
        editRegistro,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      if (atualizar.status >= 200 && atualizar.status < 300) {
        window.alert("Atualização efetuada com sucesso!");
        window.location.reload(true); // Recarrega a página completamente
      }
      setRegistroAtual({ ...registroAtual, editRegistro });
    } catch (error) {
      window.alert("Senha anterior incorreta!");
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
      <br></br>
      <div className="tabela">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Pesquisar Usuários</h2>
          </div>
          <Form>
            <Row>
              <Col xs={12} md={8}>
                <Form.Group>
                  <Form.Control
                    placeholder="Nome"
                    type="text"
                    value={name}
                    onChange={handleNomeChange}
                  />
                </Form.Group>
              </Col>
              <Col  className="justify-content-center row">
                <div
                  className="btn-group "
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant="success"
                    onClick={handlePesquisa}
                  >
                    Pesquisar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleLimpar}
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
          Adicionar usuario
        </Button>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Lista de Usuários</h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-container table-wrap">
                <table
                  className="table myaccordion table-hover text-center nowrap"
                  id="accordion"
                  responsive="lg"
                >
                  <thead>
                    <tr>
                      <th>Nome</th>
                      {/* <th>Login</th> */}
                      <th>Categoria</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registros.map((registro) => (
                      <tr key={registro.id}>
                        <td>{registro.name}</td>
                        <td
                          className={registro.cat ? "Administrador" : "Comum"}
                        >{registro.cat  ? "Administrador" : "Comum"}
                        </td>
                        <td>
                        <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                          <Button
                          variant="success"
                            onClick={() => buscarRegistro(registro.id)}
                          >
                            Editar
                          </Button>
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
                      Cadastrar usuário
                    </Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={handleSubmit}>
                    <Modal.Body className="show-grid">
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                          >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              name="name"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                          >
                            <Form.Label>Tipo de usuário</Form.Label>
                            <Form.Select
                              type="number"
                              id="cat"
                              name="cat"
                              required
                            
                            >
                               <option value="" disabled selected>
                                Selecione...
                              </option>
                              <option value={false}>
                                 Comum
                              </option>
                              <option value={true}>
                                Administrador
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"         
                          >  
                          <Form.Label>Senha</Form.Label>
                          <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            required
                          />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                          >
                            <Form.Label>Confirmar senha</Form.Label>
                            <Form.Control
                              type="password"
                              id="confirme"
                              name="confirme"
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
                      Atualizar usuário
                    </Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={confirmaEdicao}>
                    <Modal.Body className="show-grid">
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"                 
                          >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                              defaultValue={registroAtual.name}
                              type="text"
                              id="name"
                              name="name"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"  
                          >
                            <Form.Label>Tipo de usuário</Form.Label>
                            <Form.Select
                              type="number"
                              id="cat"
                              name="cat"
                              required
                              defaultValue={registroAtual.cat}
                            >
                              <option value="" disabled>
                                Selecione...
                              </option>
                              <option value={false}>
                                 Comum
                              </option>
                              <option value={true}>
                                Administrador
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-5"
                          >  
                          <Form.Label>Senha anterior</Form.Label>
                          <Form.Control
                            type="password"
                            id="oldpassword"
                            name="oldpassword"
                          />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-5"
                          >
                            <Form.Label>Nova senha</Form.Label>
                            <Form.Control
                              type="password"
                              id="password"
                              name="password"
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
}

export default User;
