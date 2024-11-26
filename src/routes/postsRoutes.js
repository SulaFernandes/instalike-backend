import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, createPosts, uploadImage, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage}); //inicializa multer, cria pasta uploads

const routes = (app) => {
    app.use(express.json()); //Para converter texto em JSON
    app.use(cors(corsOptions));

    //rota    
    app.get("/posts", listPosts);
    app.post("/posts", createPosts);
    app.post("/upload", upload.single("imagem"), uploadImage);
    app.put("/upload/:id", updateNewPost);
};

export default routes;

/*app.get("/posts", async (req, res) => {
        //res.status(200).send("Boas vindas a imersão.");
        //res.status(200).json(posts); // pega posts db local
        const posts = await getAllPosts(); // pega posts mongodb 
        res.status(200).json(posts);
    });

function buscarPostPorId(id) {
    //return posts[id];
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}
app.get("/posts/:id", (req, res) => {
    //res.status(200).send("Boas vindas a imersão.");
    //let resultadoBusca = buscarPostPorId(2);
    
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});*/