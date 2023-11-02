const db = require('../../config/mysql2/db');
const clSchema = require("../../model/joi/Client");
const authUntil = require('../../util/authUtils');

exports.getClients = () =>{
    return db.promise().query('SELECT * FROM Client')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.getClientById = (id) => {
    const query = `SELECT c.id as id, c.Name as clName,
    c.Surname as clSurname, c.Adres as clAdres, c.email as clEmail, 
    c.PhoneNumber as clPhoneNumber, c.password as clpassword, m.id as mid, m.Name, m.Type, 
    m.Size, m.Description, m.Price, o.id as o_id, o.mattress_id,
    o.client_id, o.DepartureDate, o.OrderDate, o.ShippingCosts, 
    o.Amount, o.Status
    FROM Client c
    left join Order_ as o on c.id = o.client_id
    left join Mattress as m on m.id = o.mattress_id
    where c.id = ?`;

    return db.promise().query(query, [id])
        .then((results, fields) => {
            const firstRow = results[0][0];
            console.log('firstRow', firstRow);
            if (!firstRow) {
                return {};
            }
            const client = {
                id: firstRow.id,
                Name: firstRow.clName,
                Surname: firstRow.clSurname,
                Adres: firstRow.clAdres,
                email: firstRow.clEmail,
                PhoneNumber: firstRow.clPhoneNumber,
                password: firstRow.clpassword,
                orders: []
            }
            for(let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if(row.o_id) {
                    const client_mattress = {
                        id: row.o_id,
                        mattress_id: row.mattress_id,
                        client_id: row.client_id,
                        DepartureDate: row.DepartureDate,
                        OrderDate: row.OrderDate,
                        ShippingCosts: row.ShippingCosts,
                        Amount: row.Amount,
                        Status: row.Status,
                        mattress: {
                            id: row.mid,
                            Name: row.Name,
                            Type: row.Type,
                            Size: row.Size,
                            Description: row.Description,
                            Price: row.Price,
                        }
                    }
                    client.orders.push(client_mattress);
                }
            }
            return client;
        })
        .catch(err =>{
            console.log(err);
            throw err;
        });
};
exports.createClient = (newClientData) => {
    const vRes = clSchema.validate(newClientData, {abortEarly: false});
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    console.log(newClientData);
    const Name = newClientData.Name;
    const Surname = newClientData.Surname;
    const Adres = newClientData.Adres;
    const email = newClientData.email;
    const PhoneNumber = newClientData.PhoneNumber;
    const password = newClientData.password;
    const query = `INSERT into Client (Name, Surname, Adres, email, PhoneNumber, password) values (?, ?, ?, ?, ?, ?)`;
    return db.promise().execute(query, [Name, Surname, Adres, email, PhoneNumber, password]);
};
exports.updateClient = (id, clientData) => {
    const vRes = clSchema.validate(clientData, {abortEarly: false});
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const Name = clientData.Name;
    const Surname = clientData.Surname;
    const Adres = clientData.Adres;
    const email = clientData.email;
    const PhoneNumber = clientData.PhoneNumber;
    const password = clientData.password;
    const query = `update client set name = ?, surname = ?, adres = ?, email = ?, phonenumber = ?, password = ? where id = ?`;
    return db.promise().execute(query, [Name, Surname, Adres, email, PhoneNumber, password, id]);
};
exports.deleteClient = (id) => {
    const sql1 = `DELETE FROM Order_ WHERE client_id = ?`;
    const sql2 = `DELETE FROM Client WHERE id = ?`;

    return db.promise().query(sql1, [id])
        .then(() => {
            return db.promise().query(sql2, [id])
        })
};

checkEmailUnique = (email, id) => {
    let sql, promise;
    if (id) {
        sql = `SELECT COUNT(1) as c FROM Client where id != ? and email = ?`;
        promise = db.promise().query(sql, [id, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Client where email = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then((results) => {
        console.log('results', results);
        const count = results[0][0]['c'];
        let err = {};
        if (count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Email already exists'
                }]
            };
        }
        return err;

    });
}

exports.findByEmail = (email) => {
    const sql ='SELECT * FROM Client WHERE email = ?';
    return db.promise().query(sql,[email]).then((result)=>{
        return result[0][0];
    }).catch(err=>{
        throw err;
    })
};


