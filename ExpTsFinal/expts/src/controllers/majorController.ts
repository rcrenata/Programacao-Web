import { Request, Response, RequestHandler } from 'express';  
import { createMajor, getMajor, getMajors, removeMajor, updateMajor, majorAlreadyExists } from "../services/majorService"
import { createMajorDTO, UpdateMajorDto } from '../types/majortypes';  
import Joi from 'joi';  

const createMajorSchema = Joi.object<createMajorDTO>({
    name: Joi.string().min(3).max(100).required(),
    code: Joi.string().length(4).required(),
    description: Joi.string().allow('').optional(),
    
});


const updateMajorSchema = Joi.object<UpdateMajorDto>({
    name: Joi.string().min(3).max(100).optional(),
    code: Joi.string().length(4).optional(),
    description: Joi.string().allow('').optional(),
});


const index: RequestHandler = async (req, res) => { 
    
    try{
        const majors = await getMajors();
        res.render("majors/index", {
            majors,
            title: "Lista de Cursos" 
            
        });
    }
    catch(err){
        console.error("Erro ao listar cursos:", err); 
        
        res.status(500).send("Erro interno do servidor ao listar cursos."); 
        
    }
}


const create: RequestHandler = async (req, res) => { 
    if( req.method === "GET"){
        res.render("majors/create", {
            title: "Criar Novo Curso" 
        });
    } else if (req.method === "POST"){
        try{
            const { error, value } = createMajorSchema.validate(req.body);

            if (error) {
                res.status(400).send(error.details.map(x => x.message).join(', '));
                return; 
            }

            if (await majorAlreadyExists(value.name)) {
                res.status(409).send('Já existe um curso com este nome.'); 
                return; 
            }

            await createMajor(value); 
            res.redirect("/majors");
        } catch(err){
            console.error("Erro ao criar curso:", err);
            res.status(500).send("Erro interno do servidor ao criar curso.");
        }
    }
}


const read: RequestHandler = async (req, res) => { 
    const { id } = req.params;
    try{
        const major = await getMajor(id);
        if (!major) { 
            res.status(404).send("Curso não encontrado.");
            return; 
        }
        res.render(`majors/read`,{
            major,
            title: `Detalhes do Curso: ${major.name}` 
        });
    } catch(err){
        console.error("Erro ao ler curso:", err);
        res.status(500).send("Erro interno do servidor ao ler curso.");
    }
}


const update: RequestHandler = async (req, res) => { 
    const { id } = req.params;
    try{
        let major = await getMajor(id);
        if (!major) {
            res.status(404).send("Curso não encontrado para atualização.");
            return; 
        }

        if (req.method === "GET"){
            res.render("majors/update", { 
                major,
                title: `Atualizar Curso: ${major.name}` 
            });
        } else if (req.method === "POST"){
            const { error, value } = updateMajorSchema.validate(req.body);

            if (error) {
                res.status(400).send(error.details.map(x => x.message).join(', '));
                return; 
            }

            if (value.name && value.name !== major.name && await majorAlreadyExists(value.name)) {
                res.status(409).send('Já existe outro curso com este nome.');
                return; 
            }

            await updateMajor(id, value); 
            res.redirect("/majors/read/" + id); 
        }
    } catch(err){
        console.error("Erro ao atualizar curso:", err);
        res.status(500).send("Erro interno do servidor ao atualizar curso.");
    }
}

const remove: RequestHandler = async (req, res) => { 
    const {id} = req.params
    try{
        const major = await removeMajor(id)
        res.status(200).json({ msg:`Curso deletado com sucesso: ${major.name}` });
    } catch(err){
        console.error("Erro ao deletar curso:", err);
        res.status(500).send("Erro interno do servidor ao deletar curso.");
    }
}

interface IMajorController {
    index: RequestHandler;
    create: RequestHandler;
    read: RequestHandler;
    update: RequestHandler;
    remove: RequestHandler;
}

const majorController: IMajorController = {
    index,
    create,
    read,
    update,
    remove
};

export default majorController;