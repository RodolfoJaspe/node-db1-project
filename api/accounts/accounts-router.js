const router = require('express').Router()
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')
const Accounts = require("./accounts-model")

router.get('/', (req, res, next) => {
    Accounts.getAll()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', checkAccountId, (req, res, next) => {
    try {
        res.status(200).json(req.account)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
    Accounts.create(req.body)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            next(err)
        })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
    Accounts.deleteById(req.params.id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            next(err)
        })
})

router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
