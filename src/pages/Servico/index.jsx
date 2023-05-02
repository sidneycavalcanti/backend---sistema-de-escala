import React, { useEffect, useState } from "react";
import "./servico.css";

import { visualizarImpressao } from "./pdf";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Collapse } from "react-bootstrap";

import NavBar from "../MainPage/NavBar";
import axios from "axios";

function Servico() {
  const [dadosMilitar, setDadosMilitar] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [registroAtual, setRegistroAtual] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [open, setOpen] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/servicos", {})
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

  const handleClick = (index) => {
    setOpen((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const novoRegistro = {
      //id: Date.now(),
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

    const idsMilitares = [
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

      event.target.pavsup1.value,
      event.target.pavsup2.value,

      event.target.armeiro.value,
    ];
    console.log(novoRegistro);
    console.log(idsMilitares);

    try {
      await axios.post("http://localhost:5000/servicos", novoRegistro, {
        headers: {
          "Content-type": "application/json",
        },
      });

      let i = 0;

      while (i < idsMilitares.length) {
        const endpoint = `http://localhost:5000/militares/${idsMilitares[i]}`;
        const { data } = await axios.get(endpoint);
        const atualizarMilitar = {
          ultfunc: data.ultfunc + 1, // faz soma de dias tirado de serviço
          dtultimosv: event.target.date.value,
          qtddiaf: 0,
        };

        await axios.put(endpoint, atualizarMilitar, {
          headers: {
            "Content-type": "application/json",
          },
        });
        i++;
      }

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
    console.log(response.data);
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
          <div className="col-md-13">
            <div className="table-container table-wrap">
              <table
                className="table myaccordion table-hover text-center nowrap"
                id="accordion"
                responsive="lg"
              >
                {registros && registros.length > 0 ? (
                  registros.map((registro) => (
                    <>
                      <thead>
                        <tr>
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
                        <tr key={registro.id}>
                          <td>{registro.data}</td>
                          <td>
                            {registro.oficialId.gradId.name} -{" "}
                            {registro.oficialId.name}
                          </td>
                          <td>
                            {registro.sgtdiaId.gradId.name} -{" "}
                            {registro.sgtdiaId.name}
                          </td>
                          <td>
                            {registro.cbgdId.gradId.name} -{" "}
                            {registro.cbgdId.name}
                          </td>
                          <td>
                            {registro.motoId.gradId.name} -{" "}
                            {registro.motoId.name}
                          </td>
                          <td>
                            {registro.ranchoId.gradId.name} -{" "}
                            {registro.ranchoId.name}
                          </td>
                          <td>
                            {registro.parmcavId.gradId.name} -{" "}
                            {registro.parmcavId.name}
                          </td>
                          <td>
                            {registro.armeiroId.gradId.name} -{" "}
                            {registro.armeiroId.name}
                          </td>

                          <td>
                            <Button
                              variant="info"
                              onClick={() => handleClick(registro.id)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open}
                            >
                              {" "}
                              Abrir
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
                            <td colSpan="10">
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

                              <td>
                                {registro.auxrancho1Id.gradId.name} -{" "}
                                {registro.auxrancho1Id.name}
                                <br />
                                {registro.auxrancho2Id.gradId.name} -{" "}
                                {registro.auxrancho2Id.name}
                                <br />
                                {registro.auxrancho3Id.gradId.name} -{" "}
                                {registro.auxrancho3Id.name}
                              </td>
                              <td>
                                {registro.frente1Id.gradId.name} -{" "}
                                {registro.frente1Id.name}
                                <br />
                                {registro.frente2Id.gradId.name} -{" "}
                                {registro.frente2Id.name}
                                <br />
                                {registro.frente3Id.gradId.name} -{" "}
                                {registro.frente3Id.name}
                              </td>
                              <td>
                                {registro.tras1Id.gradId.name} -{" "}
                                {registro.tras1Id.name}
                                <br />
                                {registro.tras2Id.gradId.name} -{" "}
                                {registro.tras2Id.name}
                                <br />
                                {registro.tras3Id.gradId.name} -{" "}
                                {registro.tras3Id.name}
                              </td>
                              <td>
                                {registro.aloj1Id.gradId.name} -{" "}
                                {registro.aloj1Id.name}
                                <br />
                                {registro.aloj1Id.gradId.name} -{" "}
                                {registro.aloj2Id.name}
                                <br />
                                {registro.aloj1Id.gradId.name} -{" "}
                                {registro.aloj3Id.name}
                              </td>
                              <td>
                                {registro.garagem1Id.gradId.name} -{" "}
                                {registro.garagem1Id.name}
                                <br />
                                {registro.garagem2Id.gradId.name} -{" "}
                                {registro.garagem2Id.name}
                                <br />
                                {registro.garagem3Id.gradId.name} -{" "}
                                {registro.garagem3Id.name}
                              </td>
                              <td>
                                {registro.pavsup1Id.gradId.name} -{" "}
                                {registro.pavsup1Id.name}
                                <br />
                                {registro.pavsup1Id.gradId.name} -{" "}
                                {registro.pavsup1Id.name}
                              </td>
                              <td>{registro.patrulha}</td>
                              <td>{registro.instrucao}</td>
                              <td>{registro.geraladm}</td>
                              <td>{registro.jusdis}</td>
                            </td>
                          </tr>
                        </Collapse>
                      </tbody>
                    </>
                  ))
                ) : (
                  <h3>não há registros para exibir</h3>
                )}
              </table>
            </div>
          </div>
        </div>
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
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Dia do serviço </Form.Label>
                    <Form.Control type="date" id="date" name="date" required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Oficial de dia:</Form.Label>
                    <Form.Select
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      <option value="">Não tem</option>
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
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      <option value="">Não tem</option>
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
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      <option value="">Não tem</option>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
                        Primeiro quarto
                      </option>
                      <option value="">Não tem</option>
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
                      <option value="" disabled selected>
                        Segundo quarto
                      </option>
                      <option value="">Não tem</option>
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
                      <option value="" disabled selected>
                        Terceiro quarto
                      </option>
                      <option value="">Não tem</option>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                      <option value="" disabled selected>
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
                Cadastrar
              </Button>
              <Button variant="danger" onClick={handleModalClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>  
    </>
  );
}

export default Servico;
