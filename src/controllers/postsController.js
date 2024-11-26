import fs from "fs";
import { getAllPosts, buildPost, updatePost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts(); // pega posts mongodb 
    res.status(200).json(posts);
};

export async function createPosts(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await buildPost(newPost);
        res.status(200).json(createdPost);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const createdPost = await buildPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage); //troca o nome da imagem pelo id criado pelo bd
        res.status(200).json(createdPost);        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    
};

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`; 

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImage,
            descricao: descricao,
            alt: req.body.alt
        };

        const createdPost = await updatePost(id, post);
        res.status(200).json(createdPost);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};