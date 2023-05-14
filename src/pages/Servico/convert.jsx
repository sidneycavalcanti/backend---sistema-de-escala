import logo from "../../assets/logo.png";
const logoBase64 = await toBase64(logo); // converte a imagem em base64

const docDefinition = {
  content: [
    {
      image: logoBase64,
      width: 100,
      height: 100,
    },
    {
      text: "Exemplo de texto abaixo da imagem",
      fontSize: 16,
    },
  ],
};

