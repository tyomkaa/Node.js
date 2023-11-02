const ClientRepository = require('../repository/mysql2/ClientRepository');

exports.showClientList = (req, res, next) =>{
    let message = req.query.message;
    ClientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list',
                {
                    navLocation: 'clients',
                    clients: clients,
                    message: message });
        });
}

exports.showAddClientForm = (req, res, next) =>{
            res.render('pages/client/form', {
                client: {},
                pageTitle: req.__('client.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('client.form.add.btnLabel'),
                formAction: '/client/add',
                navLocation: 'clients',
                validationErrors: []
        });


}

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.id;
    ClientRepository.getClientById(clientId)
        .then(client => {
            console.log('client', client);
            res.render('pages/client/form', {
                navLocation: 'clients',
                client: client,
                formMode: 'edit',
                pageTitle: req.__('client.form.edit.pageTitle'),
                btnLabel: req.__('client.form.edit.btnLabel'),
                formAction: '/client/edit',
                validationErrors: []
            });
        })
};

exports.showClientDetails = (req, res, next) =>{
    const ClientId = req.params.id;
    ClientRepository.getClientById(ClientId)
        .then(client => {
            console.log('clients\n',client.orders);
            res.render('pages/client/list-details', {
                navLocation: 'clients',
                clients: client,
                pageTitle: 'Details of client',
                formAction: '',
                formMode: 'showDetails'
            });
        })
}

exports.addClient = (req, res, next) => {
    const clientData = {...req.body};
    console.log(clientData);
    ClientRepository.createClient(clientData)
        .then(client => {
            console.log('redirected');
            res.redirect('/client?message=Client is added');
        })
        .catch(err => {
            console.log('Error: ', err)
            res.render('pages/client/form', {
                client: clientData,
                pageTitle: req.__('client.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: 'Add client',
                formAction: '/client/add',
                navLocation: 'clients',
                validationErrors: err.details
            });
            console.log(err.details)
        })
};

exports.updateClient = (req, res, next) => {
    const clientData = {...req.body};
    const clientId = req.body.id;
    console.log(clientData, clientId);
    ClientRepository.updateClient(clientId, clientData)
        .then(client => {
            res.redirect('/client?message=Client is updated');
        })
        .catch(err => {
            res.render('pages/client/form', {
                client: clientData,
                pageTitle: 'Edit client',
                formMode: 'edit',
                btnLabel: 'Edit',
                formAction: '/client/edit',
                navLocation: 'clients',
                validationErrors: err.details
            })
        })
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.id;
    ClientRepository.deleteClient(clientId)
        .then(client => {
            res.redirect('/client?message=Client is deleted');
        });
};