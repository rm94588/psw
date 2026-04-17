
//rotas de exclusão (teste / funcional)
// exclusão física 
router.get("/excluir-fisico", async (req, res) => {
    const id = req.query.id;
    try {
        const result = await deleteFisica(id);
        console.log('delete fisico', result);
        res.redirect("/");
    } catch (erro) {
        console.log(erro);
    }
});

// exclusão lógica 
router.get("/excluir-logico", async (req, res) => {
    const id = req.query.id;
    try {
        const result = await deleteLogica(id);
        console.log('delete logico', result);
        res.redirect("/");
    } catch (erro) {
        console.log(erro);
    }
});


router.get("/teste-insert", async (req, res)=>{
    const dadosInsert =  {
            nome: "instalar o fortnite no Lab 1 Terreo",
            prazo:"2026-03-19"
            }
    try{
        const resultInsert = await tarefasModel.create(dadosInsert);
        res.send(resultInsert)    
    }catch(erro){
        console.log(erro);
    }

});


//delete físico - hard delete
router.get("/teste-delete", async (req, res)=>{
    let idTarefa = 17;
    try{
        const resultDelete = await deleteFisica(idTarefa);
        res.send(resultDelete)    
    }catch(erro){
        console.log(erro);
    }
});

//exercicio - teste de update -> delete lógico ou soft delete
//delete lógico - soft delete
router.get("/teste-soft-delete", async (req, res)=>{
    let idTarefa = 15;
    try{
        const resultUpdate = await deleteLogica(idTarefa);
        res.send(resultUpdate);    
    }catch(erro){
        console.log(erro);
    }
});


module.exports = router;