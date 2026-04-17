var express = require("express");
var router = express.Router();
//requisição do Model uso onrigatório de chaves e nome definido no objeto
const { tarefasModel, deleteFisica, deleteLogica } = require("../models/tarefasModel");
const moment = require("moment");
moment.locale('pt-br');

const { body, validationResult } = require('express-validator');




router.get("/", async function (req, res) {
    res.locals.moment = moment;
    try{
        const linhas = await tarefasModel.findAll();
        res.render("pages/index", {linhasTabela:linhas});
    }catch(erro){
        console.log(erro);
    }
});


router.get("/cadastro", (req, res)=>{
    res.locals.moment = moment;
    res.render("pages/cadastro",{tituloAba:"Cadastro de tarefa",tituloPagina:"Nova Tarefa",
        tarefa:{id_tarefa:0,nome_tarefa:"",prazo_tarefa:"",situacao_tarefa:1},
        errors: []
    });
});

router.get("/alterar", async (req, res)=>{
    res.locals.moment = moment;
    //recuperar o id da queryString
    const id = req.query.id;
    try{
        const tarefa = await tarefasModel.findById(id);

        res.render("pages/cadastro",{tituloAba:"Edição de tarefa",tituloPagina:"Alterar Tarefa",
            tarefa:tarefa[0],
            errors: []
        });
    }catch(erro){
        console.log(erro);
    }
});

// validações com express-validator
const cadastroValidations = [
    body('tarefa').isLength({min:5, max:45}).withMessage('Nome deve ter entre 5 e 45 caracteres'),
    body('prazo').isISO8601().withMessage('Prazo inválido').bail()
        .custom((value) => {
            if (!moment(value).isSameOrAfter(moment(), 'day')) {
                throw new Error('Prazo deve ser hoje ou data futura');
            }
            return true;
        }),
    body('situacao').isInt({min:0, max:4}).withMessage('Situação inválida'),
    body('id').toInt()
];

router.post("/cadastro", cadastroValidations, async (req, res)=>{
    // validar
    const errors = validationResult(req);
    const objJson = {
        id: req.body.id,
        nome:req.body.tarefa,
        prazo:req.body.prazo,
        situacao:req.body.situacao
    }

    if (!errors.isEmpty()){
        // reexibir o formulário com erros e dados informados
        res.locals.moment = moment;
        return res.render("pages/cadastro", {
            tituloAba: objJson.id == 0 ? "Cadastro de tarefa" : "Edição de tarefa",
            tituloPagina: objJson.id == 0 ? "Nova Tarefa" : "Alterar Tarefa",
            tarefa: { id_tarefa: objJson.id, nome_tarefa: objJson.nome, prazo_tarefa: objJson.prazo, situacao_tarefa: objJson.situacao },
            errors: errors.array()
        });
    }

    try{
        if(objJson.id == 0){
            var result = await tarefasModel.create(objJson);
        }else{
            var result = await tarefasModel.update(objJson);
        }
        console.log(result);
        res.redirect("/");
    }catch(erro){
        console.log(erro)
    }    
});



module.exports = router;