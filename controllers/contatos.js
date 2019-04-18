var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

module.exports = function(app){
      var ContatoController = {
            update: async (req, res) =>{
                  try{
                        if(localStorage.getItem('countIds') == undefined){
                              localStorage.setItem('countIds', 0);
                        }
                        const contact = {
                              id: req.body.contact.id,
                              name: req.body.contact.name,
                              phone: req.body.contact.phone,
                              operator: req.body.contact.operator,
                        }
                        
                        if(contact.id){
                              if(localStorage.getItem(contact.id) != undefined){
                                    localStorage.setItem(contact.id, JSON.stringify(contact));
                                    return res.status(200).send({success:'Updated',contact})
                              }else{
                                    return res.status(200).send({error:'Contact not found'})
                              }
                        }else{
                              return res.status(200).send({error:'Invalid Request'})
                        }
                  }catch(err){
                        return res.status(500).send({ error: 'Internal Server Error',err})
                  }
            },
            delete: async (req, res) =>{
                  try{
                        if(localStorage.getItem('countIds') == undefined){
                              localStorage.setItem('countIds', 0);
                        }
                        if(req.params.id != undefined){
                              localStorage.removeItem(req.params.id)
                              return res.status(200).send({success:'Deleted'});
                        }
                        return res.status(200).send({error:'Invalid Request'})
                  }catch(err){
                        return res.status(500).send({ error: 'Internal Server Error' })
                  }
            },
            save: async (req,res) =>{
                  try{
                        if(localStorage.getItem('countIds') == undefined){
                              localStorage.setItem('countIds', 0);
                        }
                        const contact = {
                              id: localStorage.getItem('countIds'),
                              name: req.body.contact.name,
                              phone: req.body.contact.phone,
                              operator: req.body.contact.operator,
                        }
                        
                        
                        localStorage.setItem('countIds', parseInt(localStorage.getItem('countIds'))+1);
                        localStorage.setItem(contact.id, JSON.stringify(contact));
                        
                        return res.status(201).send({ success: 'Created',contact })
                  }catch(err){
                        return res.status(500).send({ error: 'Internal Server Error',err})
                  }
            },
            getAll: async (req,res) => {
                  try{
                        if(localStorage.getItem('countIds') == undefined){
                              localStorage.setItem('countIds', 0);
                        }
                        const total = localStorage.getItem('countIds');
                        var contacts = [];
                        for (var i = 0; i <= total; i++){
                              if(localStorage.getItem(i) != undefined){
                                    contacts.push(JSON.parse(localStorage.getItem(i)))
                              }
                        }
                        
                        return res.status(200).send({contacts})
                  }catch(err){
                        return res.status(500).send({ error: 'Internal Server Error' })
                  }
            }
            
      }
  
      return ContatoController;
};
    
