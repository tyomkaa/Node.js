const MattressRepository = require("../repository/mysql2/MattressRepository");

exports.showMattressList = (req, res, next) =>{
    let message = req.query.message;
    MattressRepository.getMattresses()
        .then(mattresses => {
            res.render('pages/mattress/mattresses',
                {
                    navLocation: 'mattresses',
                    mattresses: mattresses,
                    message: message });
        });
}

exports.showAddMattressForm = (req, res, next) =>{
    res.render('pages/mattress/mattresses-form', {
        mattress: {},
        pageTitle: req.__('mattress.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('mattress.form.add.btnLabel'),
        formAction: '/mattress/add',
        navLocation: 'mattresses',
        validationErrors: []
    });
}

exports.showEditMattressForm = (req, res, next) => {
    const mattressId = req.params.id;
    MattressRepository.getMattressById(mattressId)
        .then(mattress => {
            console.log(mattress);
            res.render('pages/mattress/mattresses-form', {
                navLocation: 'mattresses',
                mattress: mattress,
                formMode: 'edit',
                pageTitle: req.__('mattress.form.edit.pageTitle'),
                btnLabel: req.__('mattress.form.edit.btnLabel'),
                formAction: `/mattress/edit`,
                validationErrors: []
            });
        })
};

exports.showMattressDetails = (req, res, next) =>{
    const MattressId = req.params.id;
    MattressRepository.getMattressById(MattressId)
        .then(mattress => {
            console.log('mattresses\n',mattress.orders);
            res.render('pages/mattress/mattresses-details', {
                navLocation: 'mattresses',
                mattresses: mattress,
                pageTitle: 'Details of mattress',
                formAction: '',
                formMode: 'showDetails'
            });
        })
}

exports.addMattress = (req, res, next) => {
    const mattressData = {...req.body};
    console.log(mattressData);
    MattressRepository.createMattress(mattressData)
        .then(mattress => {
            console.log('redirected');
            res.redirect('/mattress?message=Mattress is added');
        })
        .catch(err => {
            console.log('add mattress ', err);

            res.render('pages/mattress/mattresses-form', {
                mattress: mattressData,
                pageTitle: 'New mattress',
                formMode: 'createNew',
                btnLabel: 'Add mattress',
                formAction: '/mattress/add',
                navLocation: 'mattresses',
                validationErrors: err.details
            })
        })
};

exports.updateMattress = (req, res, next) => {
    const mattressData = {...req.body};
    const mattressId = req.body.id;
    console.log(mattressData, mattressId);
    MattressRepository.updateMattress(mattressId, mattressData)
        .then(mattress => {
            res.redirect('/mattress?message=Mattress is updated');
        })
        .catch(err => {
            res.render('pages/mattress/mattresses-form', {
                mattress: mattressData,
                pageTitle: 'Edit mattress',
                formMode: 'edit',
                btnLabel: 'Edit',
                formAction: '/mattress/edit',
                navLocation: 'mattresses',
                validationErrors: err.details
            })
        })
};

exports.deleteMattress = (req, res, next) => {
    const mattressId = req.params.id;
    MattressRepository.deleteMattress(mattressId)
        .then(mattress => {
            res.redirect('/mattress?message=Mattress is deleted');
        });
};