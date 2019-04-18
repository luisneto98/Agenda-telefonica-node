module.exports = function(app){
    var contatos = app.controllers.contatos;
    app.post("/contatos/save", contatos.save);
    app.get("/contatos/getAll", contatos.getAll);
    app.delete("/contatos/delete/:id", contatos.delete);
    app.put("/contatos/update", contatos.update);
}