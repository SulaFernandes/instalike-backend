// aspas duplas ou simples, usar ;
import express from "express";
import routes from "./src/routes/postsRoutes.js";

//bd fake
/*const posts = [ 
    {
        id: 1,
        descricao: "Uma foto de teste",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 2,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats.com/felix/400/200"
    },
    {
        id: 3,
        descricao: "Gatinho dormindo em uma caixa",
        imagem: "https://placecats.com/whiskers/350/350"
    },
    {
        id: 4,
        descricao: "Gatos olhando pela janela",
        imagem: "https://placecats.com/ginger/500/250"
    },
    {
        id: 5,
        descricao: "Gato comendo ração",
        imagem: "https://placecats.com/oreo/250/300"
    },
    {
        id: 6,
        descricao: "Gato fazendo yoga",
        imagem: "https://placecats.com/marmalade/400/400"
    }
];*/

const app = express(); //inicializar servidor
app.use(express.static("uploads"));// servir arquivos estaticos
routes(app);

app.listen(3000, () => {
    console.log("Server listening...");
});