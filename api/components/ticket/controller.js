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

    let nowDate = new Date();
    let expiryDate = nowDate.setHours(5);

    async function upsert(body){
        const ticket = {
            name: body.name,
            description : body.description,
            product_id : body.product_id,
            valid_since : nowDate,
            valid_until : expiryDate,
            validated: false
        }

        if(body.id){
            ticket.id = body.id
        }else{
            ticket.id = nanoid();
        }
        
        return store.upsert(TABLE,ticket);
    }

    async function validate(ticket){
        ticket.validated = true;
        return store.upsert(TABLE,ticket);
    }

    return{
        list,
        get,
        upsert,
        validate,
    }
}
