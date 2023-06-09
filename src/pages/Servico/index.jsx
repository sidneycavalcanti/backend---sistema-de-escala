import React, { useEffect, useState } from "react";
import { visualizarImpressao } from "./pdf";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Collapse, Pagination } from "react-bootstrap";

import NavBar from "../MainPage/NavBar";
import axios from "axios";

function Servico() {
  const [dadosMilitar, setDadosMilitar] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [registrostotal, setRegistrosTotal] = useState([]);
  const [registroAtual, setRegistroAtual] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [buttonText] = useState("Abrir");
  const [open, setOpen] = useState({});
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [minDate, setMinDate] = useState("");

  const token = localStorage.getItem("token");
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchRegistro();
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/militarestotal?situacao=0",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDadosMilitar(response.data);
      } catch (error) {
        console.error("Não foi possível obter os dados do servidor:", error);
      }
    };
    fetchData();
  }, []);

  if (!minDate) {
    setMinDate(currentDate);
  }

  const fetchRegistro = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/servicos?page=${currentPage}`,
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
          .get(`http://localhost:5000/servicos?page=${totalPages}`, {
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

  const handleClick = async (index) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    // setButtonText((prevText) => (prevText === "Abrir" ? "Fechar" : "Abrir"));
  };

  const handlePesquisa = async (event) => {
    event.preventDefault();

    const dataPesquisa = data;

    try {
      const response = await axios.get(
        `http://localhost:5000/servicos?id=${dataPesquisa}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegistros(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataChange = async (event) => {
    setData(event.target.value);
  };

  const handleLimpar = () => {
    setData("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     

      const novaData = event.target.date.value;
      const today = new Date();

      const escala = event.target.escala.value;

      const response = await axios.get("http://localhost:5000/servicos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const registros = response.data.data;
      

      const registroExistente = registros.find(
        (registro) => registro.data === novaData
      );

      if (registroExistente) {
        const dataCadastrada = registroExistente.data;
        alert(`Já existe um registro para esta data (${dataCadastrada})`);
        return;
      }

      const novoRegistro = {
        data: novaData,
        bi: event.target.bi.value,
        escala: escala,
        oficial_id: event.target.oficial.value,
        sgtdia_id: event.target.sgt.value,
        cbgd_id: event.target.cb.value,
        moto_id: event.target.moto.value,
        rancho_id: event.target.permrancho.value,
        parmcav_id: event.target.baia.value,

        auxrancho1_id: event.target.auxrancho1.value,
        auxrancho2_id: event.target.auxrancho2.value,
        auxrancho3_id: event.target.auxrancho3.value,

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

        pavsup1_id: event.target.pavsup1.value,
        pavsup2_id: event.target.pavsup2.value,

        armeiro_id: event.target.armeiro.value,

        patrulha: event.target.patrulha.value,
        instrucao: event.target.instrucao.value,
        geraladm: event.target.geraladm.value,
        jusdis: event.target.jusdis.value,
      };

      const idtMilitar = [
        event.target.oficial.value,
        event.target.sgt.value,
        event.target.cb.value,
        event.target.moto.value,
        event.target.permrancho.value,
        event.target.baia.value,

        event.target.auxrancho1.value,
        event.target.auxrancho2.value,
        event.target.auxrancho3.value,

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
        event.target.garagem3.value,
      ];

      await axios.post("http://localhost:5000/servicos", novoRegistro, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data === today) {
        if (escala === true) {
          for (let i = 0; i < idtMilitar.length; i++) {
            await axios.put(
              `http://localhost:5000/militarestotal/${idtMilitar[i]}`,
              {
                qtddiaf: 0,
                dtultimosvpre: data,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        } else {
          for (let i = 0; i < idtMilitar.length; i++) {
            await axios.put(
              `http://localhost:5000/militarestotal/${idtMilitar[i]}`,
              {
                qtddiafvermelha: 0,
                dtultimosverm: data,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        }
      }

      window.alert("Cadastro efetuado com sucesso!");
      setRegistros([...registros, registroAtual]);
      event.target.reset();
      window.location.reload(true);
    } catch (error) {
      console.error("Erro ao criar registro:", error);
    }
  };

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Ao Excluir pode ser necessario ajustar a data do ultimo serviço e a folga do militar, tem certeza que deseja excluir essa escala?"
    );
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/servicos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const novosRegistros = registros.filter((registro) => registro.id !== id);
      setRegistros(novosRegistros);
    }
  }

  const buscarRegistro = async (id) => {
    const response = await axios.get(`http://localhost:5000/servicos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRegistroAtual(response.data);
    setIsModalOpen2(true);
  };

  const confirmaEdicao = async (event) => {
    event.preventDefault();
    const editRegistro = {
      data: event.target.date.value,

      oficial_id: event.target.oficial.value,
      sgtdia_id: event.target.sgt.value,
      cbgd_id: event.target.cb.value,
      moto_id: event.target.moto.value,
      rancho_id: event.target.permrancho.value,
      parmcav_id: event.target.baia.value,

      auxrancho1_id: event.target.auxrancho1.value,
      auxrancho2_id: event.target.auxrancho2.value,
      auxrancho3_id: event.target.auxrancho3.value,

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

      pavsup1_id: event.target.pavsup1.value,
      pavsup2_id: event.target.pavsup2.value,

      armeiro_id: event.target.armeiro.value,

      patrulha: event.target.patrulha.value,
      instrucao: event.target.instrucao.value,
      geraladm: event.target.geraladm.value,
      jusdis: event.target.jusdis.value,
    };

    try {
      // Faz a requisição PUT enviando os dados a serem atualizados no corpo da requisição
      axios.put(
        `http://localhost:5000/servicos/${registroAtual.id}`,
        editRegistro,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen2(false);
      window.location.reload(true);
    } catch (error) {
      window.alert(error);
      console.error("Erro ao editar registro:", error);
    }
  };

  function handleModalClose() {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  }

  const atualizarDadosTodosMilitares = async () => {
    try {
      const { parseISO, formatISO } = require("date-fns");

      const response = await axios.get("http://localhost:5000/servicostotal", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRegistrosTotal(response.data.data);

      for (let i = 0; i < registrostotal.length; i++) {
        const endpoint = `http://localhost:5000/servicostotal/${registrostotal[i].id}`;
        const { data: servicos } = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = parseISO(servicos.data);
        const today = new Date();

        const militares = [
          servicos.oficial_id,
          servicos.sgtdia_id,
          servicos.cbgd_id,
          servicos.moto_id,
          servicos.rancho_id,
          servicos.parmcav_id,

          servicos.auxrancho1_id,
          servicos.auxrancho2_id,
          servicos.auxrancho3_id,

          servicos.frente1_id,
          servicos.frente2_id,
          servicos.frente3_id,

          servicos.tras1_id,
          servicos.tras2_id,
          servicos.tras3_id,

          servicos.aloj1_id,
          servicos.aloj2_id,
          servicos.aloj3_id,

          servicos.garagem1_id,
          servicos.garagem2_id,
          servicos.garagem3_id,
        ];

        if (
          formatISO(data, { representation: "date" }) ===
          formatISO(today, { representation: "date" })
        ) {
          if (servicos.escala === true) {
            for (let j = 0; j < dadosMilitar.length; j++) {
              const endpointMilitar = `http://localhost:5000/militarestotal/${dadosMilitar[j].id}`;
              const { data: militar } = await axios.get(endpointMilitar, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              // console.log(militar.qtddiaf)
              await axios.put(
                endpointMilitar,
                {
                  qtddiaf: militar.qtddiaf + 1,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }

            for (let j = 0; j < militares.length; j++) {
              const endpointMilitar = `http://localhost:5000/militarestotal/${militares[j]}`;
              const { data: militar } = await axios.get(endpointMilitar, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(militar);

              await axios.put(
                endpointMilitar,
                {
                  qtddiaf: 0,
                  dtultimosvpre: data,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }
          } else if (servicos.escala === false) {
            for (let j = 0; j < dadosMilitar.length; j++) {
              const endpointMilitar = `http://localhost:5000/militarestotal/${dadosMilitar[j].id}`;
              const { data: militar } = await axios.get(endpointMilitar, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              // console.log(militar.qtddiaf)
              await axios.put(
                endpointMilitar,
                {
                  qtddiafvermelha: militar.qtddiafvermelha + 1,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }

            for (let j = 0; j < militares.length; j++) {
              const endpointMilitar = `http://localhost:5000/militarestotal/${militares[j]}`;
              const { data: militar } = await axios.get(endpointMilitar, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(militar);

              await axios.put(
                endpointMilitar,
                {
                  qtddiafvermelha: 0,
                  dtultimosverm: data,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }
          } else {
            return;
          }
        }
      }
    } catch (error) {
      console.error(
        "Erro ao atualizar contador para todos os militares:",
        error
      );
    }
  };

  setInterval(() => {
    atualizarDadosTodosMilitares();
  }, 24 * 60 * 60 * 1000); //24 horas

  return (
    <>
      <NavBar />
      <br></br>
      <div className="tabela">
        <div className="row justify-content-center  ">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Pesquisar Escala</h2>
          </div>
          <Form>
            <Row>
              <Col xs={12} md={8}>
                <Form.Group>
                  <Form.Select value={data} onChange={handleDataChange}>
                    <option>Selecione...</option>
                    {registros.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.data}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="justify-content-center row">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button variant="success" onClick={handlePesquisa}>
                    Pesquisar
                  </Button>
                  <Button variant="secondary" onClick={handleLimpar}>
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
          Adicionar serviço
        </Button>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section">Lista de Serviços</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-container table-wrap">
              {registros && registros.length > 0 ? (
                registros.map((registro) => (
                  <table
                    className="table myaccordion table-hover text-center nowrap"
                    id="accordion"
                    responsive="lg"
                    key={registro.id} // Moved the key to the table element
                  >
                    <thead>
                      <tr>
                        <th>BI</th>
                        <th>Escala</th>
                        <th>Data</th>
                        <th>Oficial</th>
                        <th>Sgt de Dia</th>
                        <th>Cabo da guarda</th>
                        <th>Motorista</th>
                        <th>Perm ao Rancho</th>
                        <th>Perm á Cavalariça</th>
                        <th>Armaria</th>
                        <th>Mostrar escala</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Wrapping the table row with React.Fragment */}
                      <React.Fragment key={registro.id}>
                        <tr>
                          <td>{registro.bi}</td>
                          <td
                            className={registro.escala ? "preta" : "vermelha"}
                          >
                            {registro.escala ? "Preta" : "Vermelha"}
                          </td>
                          <td>{registro.data}</td>
                          <td>
                            {registro.oficialId.gradId.name}{" "}
                            {registro.oficialId.name}
                          </td>
                          <td>
                            {registro.sgtdiaId.gradId.name}{" "}
                            {registro.sgtdiaId.name}
                          </td>
                          <td>
                            {registro.cbgdId.gradId.name} {registro.cbgdId.name}
                          </td>
                          <td>
                            {registro.motoId.gradId.name} {registro.motoId.name}
                          </td>
                          <td>
                            {registro.ranchoId.gradId.name}{" "}
                            {registro.ranchoId.name}
                          </td>
                          <td>
                            {registro.parmcavId.gradId.name}{" "}
                            {registro.parmcavId.name}
                          </td>
                          <td>
                            {registro.armeiroId.gradId.name}{" "}
                            {registro.armeiroId.name}
                          </td>
                          <td>
                            <Button
                              id={`mostrar-${registro.id}`}
                              variant="info"
                              onClick={() => handleClick(registro.id)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open}
                            >
                              {buttonText}
                            </Button>
                          </td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <Button
                                variant="success"
                                onClick={() => visualizarImpressao(registro.id)}
                              >
                                Documento
                              </Button>{" "}
                              <Button
                                variant="primary"
                                onClick={() => buscarRegistro(registro.id)}
                              >
                                Editar
                              </Button>{" "}
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(registro.id)}
                              >
                                Excluir
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <Collapse in={open[registro.id]}>
                          <tr>
                            <td colSpan="12">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Aux Perm ao Rancho</th>
                                    <th>Gd ao Pav Principal</th>
                                    <th>Reforço ao Pav Principal</th>
                                    <th>Plantão do Alojamento</th>
                                    <th>Plantão ao Posto de Combustivel</th>
                                    <th>Manutenção ao Pav Superior</th>
                                    <th>Patrulha</th>
                                    <th>2ª parte</th>
                                    <th>3ª parte</th>
                                    <th>4ª parte</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {registro.auxrancho1Id.gradId.name}{" "}
                                      {registro.auxrancho1Id.name}
                                      <br />
                                      {registro.auxrancho2Id.gradId.name}{" "}
                                      {registro.auxrancho2Id.name}
                                      <br />
                                      {registro.auxrancho3Id.gradId.name}{" "}
                                      {registro.auxrancho3Id.name}
                                    </td>
                                    <td>
                                      {registro.frente1Id.gradId.name}{" "}
                                      {registro.frente1Id.name}
                                      <br />
                                      {registro.frente2Id.gradId.name}{" "}
                                      {registro.frente2Id.name}
                                      <br />
                                      {registro.frente3Id.gradId.name}{" "}
                                      {registro.frente3Id.name}
                                    </td>
                                    <td>
                                      {registro.tras1Id.gradId.name}{" "}
                                      {registro.tras1Id.name}
                                      <br />
                                      {registro.tras2Id.gradId.name}{" "}
                                      {registro.tras2Id.name}
                                      <br />
                                      {registro.tras3Id.gradId.name}{" "}
                                      {registro.tras3Id.name}
                                    </td>
                                    <td>
                                      {registro.aloj1Id.gradId.name}{" "}
                                      {registro.aloj1Id.name}
                                      <br />
                                      {registro.aloj1Id.gradId.name}{" "}
                                      {registro.aloj2Id.name}
                                      <br />
                                      {registro.aloj1Id.gradId.name}{" "}
                                      {registro.aloj3Id.name}
                                    </td>
                                    <td>
                                      {registro.garagem1Id.gradId.name}{" "}
                                      {registro.garagem1Id.name}
                                      <br />
                                      {registro.garagem2Id.gradId.name}{" "}
                                      {registro.garagem2Id.name}
                                      <br />
                                      {registro.garagem3Id.gradId.name}{" "}
                                      {registro.garagem3Id.name}
                                    </td>
                                    <td>
                                      {registro.pavsup1Id.gradId.name}{" "}
                                      {registro.pavsup1Id.name}
                                      <br />
                                      {registro.pavsup2Id.gradId.name}{" "}
                                      {registro.pavsup2Id.name}
                                    </td>
                                    <td>{registro.patrulha}</td>
                                    <td>{registro.instrucao}</td>
                                    <td>{registro.geraladm}</td>
                                    <td>{registro.jusdis}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </Collapse>
                      </React.Fragment>
                    </tbody>
                  </table>
                ))
              ) : (
                <div>
                  <h3>Não há registros para exibir.</h3>
                </div>
              )}
            </div>
          </div>
        </div>

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
              Cadastrar serviço
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="show-grid">
              <Row>
                <Col className="center">
                  <Form.Check
                    inline
                    label="Preta"
                    name="group1"
                    type="radio"
                    id="escala"
                    value={true}
                    // onChange={handleRadioChange}
                  />
                  <Form.Check
                    inline
                    label="Vermelha"
                    name="group1"
                    type="radio"
                    id="escala"
                    value={false}
                    // onChange={handleRadioChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Dia do serviço </Form.Label>
                    <Form.Control
                      type="date"
                      min={minDate}
                      id="date"
                      name="date"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Informar BI</Form.Label>
                    <Form.Control type="number" id="bi" name="bi" required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Oficial de dia/Sobre aviso:</Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      type="number"
                      id="oficial"
                      name="oficial"
                      required
                    >
                      <option disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option 
                        value={item.id} 
                        key={item.id}
                        > 
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Sargento de dia:</Form.Label>
                    <Form.Select
                      type="number"
                      id="sgt"
                      name="sgt de dia"
                      required
                    >
                    <option disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Cabo da gd:</Form.Label>
                    <Form.Select type="number" id="cb" name="cb" required>
                    <option disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Perm ao rancho:</Form.Label>
                    <Form.Select
                      type="number"
                      id="permrancho"
                      name="permrancho"
                      required
                    >
                     <option disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Motorista:</Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      type="number"
                      id="moto"
                      name="moto"
                      required
                    >
                  <option disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Parm à cavalariça:</Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      type="number"
                      id="baia"
                      name="baia"
                      required
                    >
                 <option disabled selected>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Pavilhão principal:</Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="frente1"
                      name="frente1"
                      required
                    >
                    <option disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Segundo quarto"
                      type="number"
                      id="frente2"
                      name="frente2"
                      required
                    >
                     <option disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Terceiro quarto"
                      type="number"
                      id="frente3"
                      name="frente3"
                      required
                    >
                    <option disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Reforço ao Pavilhão:</Form.Label>
                    <Form.Select
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras1"
                      name="tras1"
                      required
                    >
                      <option disabled selected>
                        Primeiro quarto
                      </option>

                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras2"
                      name="tras2"
                      required
                    >
                    <option disabled selected>
                        Segundo quarto
                      </option>

                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras3"
                      name="tras3"
                      required
                    >
                     <option disabled selected>
                        Terceiro quarto
                      </option>

                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Plantão alojamento</Form.Label>
                    <Form.Select
                      placeholder="Primeio quarto"
                      type="number"
                      id="alojamento1"
                      name="alojamento1"
                      required
                    >
                     <option disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Segundo quarto"
                      type="number"
                      id="alojamento2"
                      name="alojamento2"
                      required
                    >
                    <option disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Terceiro quarto"
                      type="number"
                      id="alojamento3"
                      name="alojamento3"
                      required
                    >
                    <option disabled selected>
                        terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label className="labelMainPage" htmlFor="garagem1">
                      Plantão garagem
                    </Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="garagem1"
                      name="garagem1"
                      required
                    >
                      <option disabled selected>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Segundo quarto"
                      type="number"
                      id="garagem2"
                      name="garagem2"
                      required
                    >
                      <option disabled selected>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Terceiro quarto"
                      type="number"
                      id="garagem3"
                      name="garagem3"
                      required
                    >
                     <option disabled selected>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="labelMainPage" htmlFor="garagem1">
                      Reforço ao rancho
                    </Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      placeholder="Primeiro auxiliar"
                      type="number"
                      id="auxrancho1"
                      name="auxrancho1"
                      required
                    >
                    <option disabled selected>
                        Primeiro auxiliar
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Segundo auxiliar"
                      type="number"
                      id="auxrancho2"
                      name="auxrancho2"
                      required
                    >
                      <option disabled selected>
                        Segundo auxiliar
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Terceiro quarto"
                      type="number"
                      id="auxrancho3"
                      name="auxrancho3"
                      required
                    >
                      <option disabled selected>
                        Terceiro auxiliar
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label className="labelMainPage">
                      Manutenção ao Pav Superior
                    </Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      placeholder="Primeio"
                      type="number"
                      id="pavsup1"
                      name="pavsup1"
                      required
                    >
                    <option disabled selected>
                        Primeiro
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      placeholder="Segundo"
                      type="number"
                      id="pavsup2"
                      name="pavsup2"
                      required
                    >
                    <option disabled selected>
                        Segundo
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label className="labelMainPage">Armeiro:</Form.Label>
                    <Form.Select
                      className="inputMainPage"
                      placeholder="Armeiro"
                      type="number"
                      id="armeiro"
                      name="armeiro"
                      required
                    >
                      <option disabled selected>
                        Armaiero
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">
                    Patrulha ao CIMNC
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="patrulha"
                    name="patrulha"
                    as="textarea"
                    rows={3}
                    required
                  >
                    01 (um) Sgt, 01 (um) Cb e 03 (três) Sd A cargo do(a)
                    ####OM#### (9 a 11 MAR 23)
                  </Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">2ª Parte</Form.Label>
                  <Form.Control
                    type="text"
                    id="instrucao"
                    name="instrucao"
                    as="textarea"
                    rows={3}
                    required
                  >
                    Sem Alteração
                  </Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">3ª Parte</Form.Label>
                  <Form.Control
                    type="text"
                    id="geraladm"
                    name="geraladm"
                    as="textarea"
                    rows={3}
                    required
                  >
                    Sem Alteração
                  </Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">4ª Parte</Form.Label>
                  <Form.Control
                    type="text"
                    id="jusdis"
                    name="jusdis"
                    as="textarea"
                    rows={3}
                    required
                  >
                    Sem Alteração
                  </Form.Control>
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
              Atualizar serviço
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={confirmaEdicao}>
            <Modal.Body className="show-grid">
              <Row>
                <Col className="center">
                  <Form.Check
                    inline
                    label="Preta"
                    name="group1"
                    type="radio"
                    id="escala"
                    value={true}
                    checked={registroAtual.escala === true}
                  />
                  <Form.Check
                    inline
                    label="Vermelha"
                    name="group1"
                    type="radio"
                    id="escala"
                    value={false}
                    checked={registroAtual.escala === false}
                  />
                </Col>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-5"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Dia do serviço </Form.Label>
                      <Form.Control
                        defaultValue={registroAtual.data}
                        type="date"
                        id="date"
                        name="date"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-5"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Informar BI</Form.Label>
                      <Form.Control
                        defaultValue={registroAtual.bi}
                        type="number"
                        id="bi"
                        name="bi"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Row>

              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Oficial de dia:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.oficial_id}
                      className="inputMainPage"
                      type="number"
                      id="oficial"
                      name="oficial"
                      required
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Sargento de dia:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.sgtdia_id}
                      type="number"
                      id="sgt"
                      name="sgt de dia"
                      required
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Cabo da gd:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.cbgd_id}
                      type="number"
                      id="cb"
                      name="cb"
                      required
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Perm ao rancho:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.rancho_id}
                      type="number"
                      id="permrancho"
                      name="permrancho"
                      required
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Motorista:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.moto_id}
                      className="inputMainPage"
                      type="number"
                      id="moto"
                      name="moto"
                      required
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Parm à cavalariça:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.parmcav_id}
                      className="inputMainPage"
                      type="number"
                      id="baia"
                      name="baia"
                      required
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Pavilhão principal:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.frente1_id}
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="frente1"
                      name="frente1"
                      required
                    >
                      <option value="" disabled>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.frente2_id}
                      placeholder="Segundo quarto"
                      type="number"
                      id="frente2"
                      name="frente2"
                      required
                    >
                      <option value="" disabled>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.frente3_id}
                      placeholder="Terceiro quarto"
                      type="number"
                      id="frente3"
                      name="frente3"
                      required
                    >
                      <option value="" disabled>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Reforço ao Pavilhão:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.tras1_id}
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras1"
                      name="tras1"
                      required
                    >
                      <option value="" disabled>
                        Primeiro quarto
                      </option>

                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.tras2_id}
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras2"
                      name="tras2"
                      required
                    >
                      <option value="" disabled>
                        Segundo quarto
                      </option>

                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.tras3_id}
                      placeholder="Primeio quarto"
                      type="number"
                      id="tras3"
                      name="tras3"
                      required
                    >
                      <option value="" disabled>
                        Terceiro quarto
                      </option>

                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label>Plantão alojamento</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.aloj1_id}
                      placeholder="Primeio quarto"
                      type="number"
                      id="alojamento1"
                      name="alojamento1"
                      required
                    >
                      <option value="" disabled>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.aloj2_id}
                      placeholder="Segundo quarto"
                      type="number"
                      id="alojamento2"
                      name="alojamento2"
                      required
                    >
                      <option value="" disabled>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.aloj3_id}
                      placeholder="Terceiro quarto"
                      type="number"
                      id="alojamento3"
                      name="alojamento3"
                      required
                    >
                      <option value="" disabled>
                        terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label className="labelMainPage" htmlFor="garagem1">
                      Plantão garagem
                    </Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.garagem1_id}
                      className="inputMainPage"
                      placeholder="Primeio quarto"
                      type="number"
                      id="garagem1"
                      name="garagem1"
                      required
                    >
                      <option value="" disabled>
                        Primeiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.garagem2_id}
                      placeholder="Segundo quarto"
                      type="number"
                      id="garagem2"
                      name="garagem2"
                      required
                    >
                      <option value="" disabled>
                        Segundo quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.garagem3_id}
                      placeholder="Terceiro quarto"
                      type="number"
                      id="garagem3"
                      name="garagem3"
                      required
                    >
                      <option value="" disabled>
                        Terceiro quarto
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="labelMainPage" htmlFor="garagem1">
                      Reforço ao rancho
                    </Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.auxrancho1_id}
                      className="inputMainPage"
                      placeholder="Primeiro auxiliar"
                      type="number"
                      id="auxrancho1"
                      name="auxrancho1"
                      required
                    >
                      <option value="" disabled>
                        Primeiro auxiliar
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.auxrancho2_id}
                      placeholder="Segundo auxiliar"
                      type="number"
                      id="auxrancho2"
                      name="auxrancho2"
                      required
                    >
                      <option value="" disabled>
                        Segundo auxiliar
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.auxrancho3_id}
                      placeholder="Terceiro quarto"
                      type="number"
                      id="auxrancho3"
                      name="auxrancho3"
                      required
                    >
                      <option value="" disabled>
                        Terceiro auxiliar
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label className="labelMainPage">
                      Manutenção ao Pav Superior
                    </Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.pavsup1_id}
                      className="inputMainPage"
                      placeholder="Primeio"
                      type="number"
                      id="pavsup1"
                      name="pavsup1"
                      required
                    >
                      <option value="" disabled>
                        Primeiro
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br></br>
                    <Form.Select
                      defaultValue={registroAtual.pavsup2_id}
                      placeholder="Segundo"
                      type="number"
                      id="pavsup2"
                      name="pavsup2"
                      required
                    >
                      <option value="" disabled>
                        Segundo
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
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
                    <Form.Label className="labelMainPage">Armeiro:</Form.Label>
                    <Form.Select
                      defaultValue={registroAtual.armeiro_id}
                      className="inputMainPage"
                      placeholder="Armeiro"
                      type="number"
                      id="armeiro"
                      name="armeiro"
                      required
                    >
                      <option value="" disabled>
                        Armaiero
                      </option>
                      {dadosMilitar.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.gradId.name} - {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">
                    Patrulha ao CIMNC
                  </Form.Label>
                  <Form.Control
                    defaultValue={registroAtual.patrulha}
                    type="text"
                    id="patrulha"
                    name="patrulha"
                    as="textarea"
                    rows={3}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">2ª Parte</Form.Label>
                  <Form.Control
                    defaultValue={registroAtual.instrucao}
                    type="text"
                    id="instrucao"
                    name="instrucao"
                    as="textarea"
                    rows={3}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">3ª Parte</Form.Label>
                  <Form.Control
                    defaultValue={registroAtual.geraladm}
                    type="text"
                    id="geraladm"
                    name="geraladm"
                    as="textarea"
                    rows={3}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelMainPage">4ª Parte</Form.Label>
                  <Form.Control
                    defaultValue={registroAtual.jusdis}
                    type="text"
                    id="jusdis"
                    name="jusdis"
                    as="textarea"
                    rows={3}
                    required
                  />
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

export default Servico;
