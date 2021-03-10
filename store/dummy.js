const db = {
    'product':[
        {
            id: '1',
            name: 'Jabon'
        }
    ]
};

async function list(table){
    return db[table] || [];
}

async function get(table,id){
    let colection = await list(table);
    return colection.find(item => item.id === id) || null
}

async function upsert(table,data){
    if(!db[table]){
      db[table] = [];  
    }
    db[table].push(data);
}

module.exports = {
    list,
    get,
    upsert,
}