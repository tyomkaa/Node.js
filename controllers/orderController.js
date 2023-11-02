const OrderRepository = require("../repository/mysql2/OrderRepository");
const MattressRepository = require("../repository/mysql2/MattressRepository");
const ClientRepository = require("../repository/mysql2/ClientRepository");

exports.showOrderList = (req, res, next) =>{
    let message = req.query.message;
    OrderRepository.getOrders()
        .then(orders => {
            res.render('pages/order/order',
                {
                    navLocation: 'orders',
                    orders: orders,
                    message: message });
        });
}

exports.showAddOrderForm = (req, res, next) =>{
    let allMattresses, allClients;
    ClientRepository.getClients()
        .then(clients => {
            allClients = clients;
            return MattressRepository.getMattresses();
        })
        .then(mattresses => {
            allMattresses = mattresses;
            res.render('pages/order/order-form', {
                order: {},
                navLocation: 'order',
                allMattresses: allMattresses,
                allClients: allClients,
                pageTitle: req.__('order.form.add.pageTitle'),
                btnLabel: req.__('order.form.add.btnLabel'),
                formAction: '/order/add',
                formMode: 'createNew',
                validationErrors: []
            });
        })
}

exports.showEditOrderForm = (req, res, next) => {
    console.log("redirected");
    const orderId = req.params.id;
    let allMattresses, allClients, order;
    OrderRepository.getOrderById(orderId)
        .then(result => {
            console.log('orderEdt', result)
            order = result;
            return ClientRepository.getClients();
        })
        .then(clients =>{
            allClients = clients;
            return MattressRepository.getMattresses();
        })
        .then(mattresses => {
            allMattresses = mattresses;
            res.render('pages/order/order-form', {
                order: order,
                navLocation: 'orders',
                allMattresses: allMattresses,
                allClients: allClients,
                pageTitle: req.__('order.form.edit.pageTitle'),
                btnLabel: req.__('order.form.edit.btnLabel'),
                formAction: '/order/edit',
                formMode: 'edit',
                validationErrors: []
            });
        })
};

exports.showOrderDetails = (req, res, next) =>{
    const OrderId = req.params.id;
    let allClients, allMattresses, order;
    ClientRepository.getClients()
        .then(clients => {
            allClients = clients;
            return MattressRepository.getMattresses();
        })
        .then(mattresses => {
            allMattresses = mattresses;
            return OrderRepository.getOrderById(OrderId)
        })
        .then(result => {
            order = result;
            res.render('pages/order/order-form', {
                order: order,
                allClients: allClients,
                allMattresses: allMattresses,
                formMode: 'showDetails',
                pageTitle: req.__('client.table.title'),
                btnLabel: 'Edit order',
                formAction: '',
                navLocation: 'order',
                validationErrors: []
            });
        });
}

exports.addOrder = (req, res, next) => {
    const orderData = {...req.body};
    let allMattresses, allClients;
    console.log('orderData', orderData);
    OrderRepository.createOrder(orderData)
        .then(obj => {
            res.redirect('/order');
        })
        .catch(err => {
            ClientRepository.getClients()
                .then(clients => {
                    allClients = clients;
                    return MattressRepository.getMattresses();
                })
                .then(mattresses => {
                    allMattresses = mattresses;
                    res.render('pages/order/order-form', {
                        order: orderData,
                        navLocation: 'order',
                        allMattresses: allMattresses,
                        allClients: allClients,
                        pageTitle: 'Form order',
                        btnLabel: 'Add new order',
                        formAction: '/order/add',
                        formMode: 'createNew',
                        validationErrors: err.details
                    });
                })
        });
};

exports.updateOrder = (req, res, next) => {
    const orderId = req.body.id;
    const orderData = {...req.body};
    console.log("order data",orderData);
    OrderRepository.updateOrder(orderId, orderData)
        .then(result => {
            res.redirect('/order?message=Order is updated');
        }).catch(err => {
        const clientId = req.params.id;
        let allClients, allMattresses, order;
        ClientRepository.getClients()
            .then(clients => {
                allClients = clients;
                return MattressRepository.getMattresses();
            }).then(mattresses => {
                allMattresses = mattresses;
                return OrderRepository.getOrderById(clientId);
        }).then(orders => {
            order = orders;
            res.render("pages/order/order-form", {
                order: order,
                navLocation: 'order',
                allMattresses: allMattresses,
                allClients: allClients,
                pageTitle: req.__('order.form.edit.pageTitle'),
                btnLabel: 'Edit',
                formAction: '/order/edit',
                formMode: 'edit',
                validationErrors: err.details
        })
        })
    });
};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.id;
    OrderRepository.deleteOrder(orderId)
        .then(order => {
            res.redirect('/order?message=Order is deleted');
        });
};