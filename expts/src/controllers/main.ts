import { Request, Response, RequestHandler } from 'express';
import { loremIpsum } from 'lorem-ipsum';
// import { Technology } from '../views/helpers/helperTypes';

interface LoremParams {
    paragrafos: string;
}

const index = (req: Request, res: Response) => {
    res.send("Hello world! (agora vindo do controller)");
};


const sobre = (req: Request, res: Response) => {
    res.render("main/about");
}



const hb1 = (req: Request, res: Response) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + Handlebars!',
    });
};

const hb2 = (req: Request, res: Response) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
    });
};

const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238},
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes});
};

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('main/hb4', { technologies });
};

const lorem: RequestHandler<LoremParams> = (req, res) => {

    const paragrafos = parseInt(req.params.paragrafos, 10);

    if (isNaN(paragrafos) || paragrafos <= 0) {
        res.status(400).send("Erro");
        return;
    }
    const text = loremIpsum({
        count: paragrafos, units: "paragraphs", format: "html",
    });
    res.send(text);
};

const testeCookie = (req : Request, res: Response) =>{
    if(!('teste-cookie' in req.cookies)){
        res.cookie('teste-cookie', 'algum-valor')
        res.send("voce nunca passou aqui")
    } else{
        res.send("voce já passou por aqui")
    }
}

export default {
    hb1,
    hb2,
    hb3,
    hb4,
    lorem,
    testeCookie 
};