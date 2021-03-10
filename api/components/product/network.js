const express = require('express');

const secure = require('../secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/',secure('admin'),list);
router.get('/:id',secure('admin'),get);

async function list(req,res,next){
    try {
        const list = await controller.list()
        response.success(req, res, list, 200)    
    } catch (e) {
        next(e);
    }
}

async function get(req,res,next){
    try {
        const product = await controller.get(req.params.id)
        response.success(req, res, product, 200)    
    } catch (e) {
        next(e);
    }          
}

module.exports = router;