import { Request, Response, RequestHandler } from 'express'; 
import { loremIpsum } from 'lorem-ipsum';



const main = (req: Request, res: Response) => {
    res.render("game/index", { 
        title: "Space Shooter"
    });
};

const about: RequestHandler = (req, res) => {
    res.render("main/about", { title: "Sobre o Jogo" });
}

const hb1: RequestHandler = (req, res) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + Handlebars!',
        title: "Página HB1"
    });
};

const hb2: RequestHandler = (req, res) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        title: "Página HB2"
    });
};

const hb3: RequestHandler = (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238},
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, title: "Página HB3" });
};

const hb4: RequestHandler = (req, res) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('main/hb4', { technologies, title: "Página HB4" });
};

const lorem: RequestHandler = (req, res) => {
    const paragrafos = parseInt((req.params as { paragrafos: string }).paragrafos, 10);

    if (isNaN(paragrafos) || paragrafos <= 0) {
        res.status(400).send("Erro: O número de parágrafos deve ser um inteiro positivo.");
        return;
    }
    const text = loremIpsum({
        count: paragrafos, units: "paragraphs", format: "html",
    });
    res.send(text);
};

const testeCookie: RequestHandler = (req, res) =>{
    if(!('teste-cookie' in req.cookies)){
        res.cookie('teste-cookie', 'algum-valor')
        res.send("Você NUNCA passou por aqui!")
    } else{
        res.send("Você JÁ passou por aqui!")
    }
}

interface IMainController {
    main: RequestHandler;
    about: RequestHandler;
    hb1: RequestHandler;
    hb2: RequestHandler;
    hb3: RequestHandler;
    hb4: RequestHandler;
    lorem: RequestHandler; 
    testeCookie: RequestHandler;
}

const mainController: IMainController = {
    main,
    about,
    hb1,
    hb2,
    hb3,
    hb4,
    lorem,
    testeCookie
};

export default mainController;