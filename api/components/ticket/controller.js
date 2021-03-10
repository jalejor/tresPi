const store = require('../../../store/dummy');

const {nanoid} = require('nanoid')

const TABLE = 'ticket';

module.exports = function(injecteStore){
    let store = injecteStore;
    if(!store){
        store = require('../../../store/dummy');
    }
    
    function list(){
        return store.list(TABLE);
    }

    function get(id){
        return store.get(TABLE,id);
    }

    async function upsert(body){
        const ticket = {
            name: body.name,
            description : body.description,
            product_id : body.product_id,
            valid_since : "1609864739000",
            valid_until : "1609864739000"
        }

        if(body.id){
            ticket.id = body.id
        }else{
            ticket.id = nanoid();
        }
        
        return store.upsert(TABLE,ticket);
    }

    return{
        list,
        get,
        upsert,
    }
}
