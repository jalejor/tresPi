const express = require('express');

const secure = require('../secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/',secure('role'),list);
router.get('/:id',secure('role'),get);
router.post('/',secure('role'),upsert);
router.put('/:id',secure('role'),validate);

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
        const ticket = await controller.get(req.params.id)
        if(!ticket){
            throw new Error('Ticket not found');
        }
        response.success(req, res, ticket, 200)    
    } catch (e) {
        next(e);
    }          
}

async function upsert(req,res,next){
    try {
        const ticket = await controller.upsert(req.body)
        response.success(req, res, ticket, 200)    
    } catch (e) {
        next(e);
    }
}

async function validate(req,res,next){
    try {
        const ticket = await controller.get(req.params.id)
        
        if(!ticket){
            throw new Error('Ticket not found');
        }

        let nowDate = new Date();
        let expiryDate = nowDate.setHours(5);

        console.log(ticket);

        if(ticket.valid_since > nowDate &&  ticket.valid_until < expiryDate){
            ticket.validated = true;
            const ticketValidated = await controller.valdiate(ticket)
            response.success(req, res, ticketValidated, 200)    
        }else{
            throw new Error('Ticket is not in time to redeem');
        }

        
    } catch (e) {
        next(e);
    }          
}

module.exports = router;