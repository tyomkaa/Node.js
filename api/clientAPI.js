const ClientRepository = require('../repository/mysql2/ClientRepository');

exports.getClients = (req, res, next) =>{
    ClientRepository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getClientById = (req, res, next) => {

    ClientRepository.getClientById(req.params.id)
        .then(client =>{
            if (!client){
                res.status(404).json({
                    message: 'Client with id: ' + id + ' not found'
                })
            }else {
                res.status(200).json(client);
            }
        });
};
exports.createClient = (req, res, next) => {
    ClientRepository.createClient(req.body)
        .then(newObj => {
            res.status(200).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.updateClient = (req, res, next) => {
    const clientId = req.params.id;

    ClientRepository.updateClient(clientId, req.body)
        .then(result => {
            res.status(200).json({message: 'Client updated!', clientId: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteClient = (req, res, next) => {
    const clientId = req.params.id;

    ClientRepository.deleteClient(clientId)
        .then(result => {
            res.status(200).json({message: 'Client removed!', clientId: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

