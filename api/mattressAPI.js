const MattressRepository = require('../repository/mysql2/MattressRepository');

exports.getMattresses = (req, res, next) =>{
    MattressRepository.getMattresses()
        .then(mattresses => {
            res.status(200).json(mattresses);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getMattressById = (req, res, next) => {

    MattressRepository.getMattressById(req.params.id)
        .then(mattresses =>{
            if (!mattresses){
                res.status(404).json({
                    message: 'Mattress with id: ' + id + ' not found'
                })
            }else {
                res.status(200).json(mattresses);
            }
        });
};
exports.createMattress = (req, res, next) => {
    MattressRepository.createMattress(req.body)
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
exports.updateMattress = (req, res, next) => {
    const mattressId = req.params.id;

    MattressRepository.updateMattress(mattressId, req.body)
        .then(result => {
            res.status(200).json({message: 'Mattress updated!', mattress: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteMattress = (req, res, next) => {
    const mattressId = req.params.id;

    MattressRepository.deleteMattress(mattressId)
        .then(result => {
            res.status(200).json({message: 'Client removed!', mattress: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

