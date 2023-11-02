const OrderRepository = require('../repository/mysql2/OrderRepository');

exports.getOrders = (req, res, next) =>{
    OrderRepository.getOrders()
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => {
            next(err);
        });
};
exports.getOrderById = (req, res, next) => {

    OrderRepository.getOrderById(req.params.id)
        .then(order =>{
            if (!order){
                res.status(404).json({
                    message: 'Order with id: ' + id + ' not found'
                })
            }else {
                res.status(200).json(order);
            }
        });
};
exports.createOrder = (req, res, next) => {
    OrderRepository.createOrder(req.body)
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
exports.updateOrder = (req, res, next) => {
    const orderId = req.params.id;

    OrderRepository.updateOrder(orderId, req.body)
        .then(result => {
            res.status(200).json({message: 'Order updated!', order: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.id;

    OrderRepository.deleteOrder(orderId)
        .then(result => {
            res.status(200).json({message: 'Order removed!', order: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

