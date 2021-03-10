const store = require('../../../store/dummy');

const TABLE = 'product';

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

    return{
        list,
        get,
    }
}
