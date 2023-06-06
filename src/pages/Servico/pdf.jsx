import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const token = localStorage.getItem("token")

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export async function visualizarImpressao(id) {
  const url = `http://localhost:5000/servicos/${id}`;
  const response = await fetch(url,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const registro = await response.json();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const dataFormatada = today.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dataServico = registro.data;
  const dataServicos = new Date(dataServico);
  const dataFormatadaSv = dataServicos.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  

  //converter imagem em binario
  const pdfDefinition = {
    content: [
      { text: "-1-", alignment: "center", bold: true },
      { text: "MINISTÉRIO DA DEFESA", alignment: "center", bold: true },
      { text: "EXÉRCITO BRASILEIRO", alignment: "center", bold: true },
      {
        text: "CAMPO DE INSTRUÇÃO MARECHAL NEWTON CAVALCANTI",
        alignment: "center",
        bold: true,
      },
      { text: "", margin: [0, 5] },
      {
        // eslint-disable-next-line
        text: "Quartel em RECIFE-PE," + " " + dataFormatada,
        alignment: "center",
      },
      { text: "", margin: [0, 5] },
      {
        // eslint-disable-next-line
        text: "ADITAMENTO AO BOLETIM INTERNO Nr " + " " + registro.bi,
        alignment: "center",
        bold: true,
      },
      { text: "", margin: [0, 5] },
      {
        text:
          "Para conhecimento deste Campo de Instrução e devida execução, publico o seguinte:",
      },
      { text: "", margin: [0, 5] },
      {
        text: "1ª PARTE - SERVIÇOS DIÁRIOS",
        decoration: "underline",
        alignment: "center",
        bold: true,
      },
      { text: "I. ESCALA DE SERVIÇO", decoration: "underline" },
      { text: "", margin: [0, 2] },
      { text: "A. INTERNO", decoration: "underline" },
      { text: "", margin: [0, 5] },
      // eslint-disable-next-line
      { text: "Para o dia" + " " + dataFormatadaSv },

      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],

          body: [
            [
              "1) Oficial de Dia/Sobreaviso",
              registro.oficialId.gradId.name + " " + registro.oficialId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],

          body: [
            [
              "2) Sgt-de-Dia",
              registro.sgtdiaId.gradId.name + " " + registro.sgtdiaId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],

          body: [
            [
              "3) Cabo da Guarda",
              registro.cbgdId.gradId.name + " " + registro.cbgdId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],

          body: [
            [
              "4) Motorista de Dia",
              registro.motoId.gradId.name + " " + registro.motoId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],

          body: [
            [
              "5) Perm ao Rancho",
              registro.ranchoId.gradId.name + " " + registro.ranchoId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],
          body: [
            [
              "6)  Aux. ao Perm ao Rancho",
              registro.auxrancho1Id.gradId.name +
                " " +
                registro.auxrancho1Id.name +
                " " +
                registro.auxrancho2Id.gradId.name +
                " " +
                registro.auxrancho2Id.name +
                " " +
                registro.auxrancho3Id.gradId.name +
                " " +
                registro.auxrancho3Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],

          body: [
            [
              "7) Perm à Cavalariça",
              registro.parmcavId.gradId.name + " " + registro.parmcavId.name,
            ],
          ],
        },
      },

      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],
          body: [
            [
              "8) Gd ao Pav Principal",
              registro.frente1Id.gradId.name +
                " " +
                registro.frente1Id.name +
                " " +
                registro.frente2Id.gradId.name +
                " " +
                registro.frente2Id.name +
                " " +
                registro.frente3Id.gradId.name +
                " " +
                registro.frente3Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],
          body: [
            [
              "9) Reforço ao Pav Principal",
              registro.tras1Id.gradId.name +
                " " +
                registro.tras1Id.name +
                " " +
                registro.tras2Id.gradId.name +
                " " +
                registro.tras2Id.name +
                " " +
                registro.tras3Id.gradId.name +
                " " +
                registro.tras3Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],
          body: [
            [
              "10) Plantão ao Posto de Combustível",
              registro.garagem1Id.gradId.name +
                " " +
                registro.garagem1Id.name +
                " " +
                registro.garagem2Id.gradId.name +
                " " +
                registro.garagem2Id.name +
                " " +
                registro.garagem3Id.gradId.name +
                " " +
                registro.garagem3Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],
          body: [
            [
              "11) Plantão ao Alojamento",
              registro.aloj1Id.gradId.name +
                " " +
                registro.aloj1Id.name +
                " " +
                registro.aloj2Id.gradId.name +
                " " +
                registro.aloj2Id.name +
                " " +
                registro.aloj3Id.gradId.name +
                " " +
                registro.aloj3Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],
          body: [
            [
              "12) Manutenção ao Pav Superior",
              registro.pavsup1Id.gradId.name +
                " " +
                registro.pavsup1Id.name +
                " " +
                registro.pavsup1Id.gradId.name +
                " " +
                registro.pavsup1Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [200, 300],
          body: [["13) Patrulha ao CIMNC", registro.patrulha]],
        },
      },
      { text: "", margin: [0, 5] },
      {
        text: "2ª PARTE - INSTRUÇÃO",
        decoration: "underline",
        alignment: "center",
        bold: true,
      },
      { text: "", margin: [0, 5] },
      {
        text: registro.instrucao,
        alignment: "center",
      },
      { text: "", margin: [0, 5] },
      {
        text: "3ª PARTE - ASSUNTO GERAIS E ADMINISTRATIVOS",
        decoration: "underline",
        alignment: "center",
        bold: true,
      },
      { text: "", margin: [0, 5] },
      {
        text: registro.geraladm,
        alignment: "center",
      },
      { text: "", margin: [0, 5] },
      {
        text: "4ª PARTE - JUSTIÇA E DISCIPLINA",
        decoration: "underline",
        alignment: "center",
        bold: true,
      },
      { text: "", margin: [0, 5] },
      {
        text: registro.jusdis,
        alignment: "center",
      },

      { text: "", margin: [0, 15] },
      {
        text: "FLAUBERT MARQUES SANTIAGO – TC",
        bold: true,
        alignment: "center",
      },
      {
        text: "Subdiretor do Campo de Instrução Marechal Newton Cavalcanti",  
        alignment: "center",
      },
      {
        text: ' "200 ANOS DO TENENTE ANTÔNIO JOÃO: HERÓI DA EPOPEIA DE DURADOS" ',
        bold: true,
        alignment: "center",
      },
    ],
  };
  try {
    const pdfDoc = pdfMake.createPdf(pdfDefinition);
    pdfDoc.open();
  } catch (error) {
    console.error(error);
  }
}
