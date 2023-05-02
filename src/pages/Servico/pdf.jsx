import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export async function visualizarImpressao(id) {
  const url = `http://localhost:5000/servicos/${id}`;
  const response = await fetch(url);
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
        text: "Quartel em RECIFE-PE," + " " + dataFormatada,
        alignment: "center",
      },
      { text: "", margin: [0, 5] },
      {
        text: "ADITAMENTO AO BOLETIM INTERNO Nr " + " " + registro.id,
        alignment: "center",
        bold: true,
      },
      { text: "", margin: [0, 5] },
      {
        text: "Para conhecimento deste Campo de Instrução e devida execução, publico o seguinte:",
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
      { text: "Para o dia" + " " + dataFormatadaSv },

      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],

          body: [
            [
              "1) Oficial de Dia/Sobreaviso",
              registro.oficialId.grad + " " + registro.oficialId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],

          body: [
            [
              "2) Sgt-de-Dia",
              registro.sgtdiaId.grad + " " + registro.sgtdiaId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],

          body: [
            [
              "3) Cabo da Guarda",
              registro.cbgdId.grad + " " + registro.cbgdId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],

          body: [
            [
              "4) Motorista de Dia",
              registro.motoId.grad + " " + registro.motoId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],

          body: [
            [
              "5) Perm ao Rancho",
              registro.parmcavId.grad + " " + registro.parmcavId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],

          body: [
            [
              "6) Aux Perm ao Rancho",
              registro.parmcavId.grad + " " + registro.parmcavId.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],

          body: [
            [
              "7) Perm à Cavalariça",
              registro.parmcavId.grad + " " + registro.parmcavId.name,
            ],
          ],
        },
      },

      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],
          body: [
            [
              "8) Gd ao Pav Principal",
              registro.frente1Id.grad +
              " " +
              registro.frente1Id.name +
              " " +
              registro.frente2Id.grad +
              " " +
              registro.frente2Id.name +
              " " +
              registro.frente3Id.grad +
              " " +
              registro.frente3Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],
          body: [
            [
              "9) Reforço ao Pav Principal",
              registro.tras1Id.grad +
              " " +
              registro.tras1Id.name +
              " " +
              registro.tras2Id.grad +
              " " +
              registro.tras2Id.name +
              " " +
              registro.frente3Id.grad +
              " " +
              registro.tras3Id.name,
            ],
          ],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          widths: [150, 300],
          body: [
            [
              "10) Plantão ao Posto de Combustível",
              registro.garagem1Id.grad +
              " " +
              registro.garagem1Id.name +
              " " +
              registro.garagem2Id.grad +
              " " +
              registro.garagem2Id.name +
              " " +
              registro.garagem3Id.grad +
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
              registro.aloj1Id.grad +
              " " +
              registro.aloj1Id.name +
              " " +
              registro.aloj2Id.grad +
              " " +
              registro.aloj2Id.name +
              " " +
              registro.aloj3Id.grad +
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
              registro.garagem1Id.grad +
              " " +
              registro.garagem1Id.name +
              " " +
              registro.garagem2Id.grad +
              " " +
              registro.garagem2Id.name,
            ],
          ],
        },
      },
      {
        text: "12) Patrulha ao CIMNC" +
          " " +
          "01(um) sgt, 01 (um) Cb e 03 (três) Sd A cargo do" +
          " " +
          "(23 a 25 Abril 23)",
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