const ClientRepository = require('../repository/mysql2/ClientRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("provided password", password)
    ClientRepository.findByEmail(email)
        .then(client => {
            console.log(client);
            if(!client) {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Wrong email or password'
                });
            }
            // else if(authUtil) {
            //     req.session.loggedUser = client;
            //     res.redirect('/');
            // } 
            else if(client.password == password) {
                req.session.loggedUser = client;
                console.log('client logged', client);
                res.redirect('/');
            }
            else {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Wrong email or password'
                })
            }

            })
            .catch(err => {
                console.log(err)
            })
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/?message=Loged out by default');
}