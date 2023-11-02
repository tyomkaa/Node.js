const db = require('../../config/mysql2/db');
const matSchema = require("../../model/joi/Mattress");

exports.getMattresses = () =>{
    return db.promise().query('SELECT * FROM Mattress')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.getMattressById = (id) => {
    const query = `SELECT m.id as id, m.Name as matName,
    m.Type as matType, m.Size as matSize, 
    m.Description as matDescription, 
    m.Price as matPrice, c.id as cid, c.Name as clName, c.Surname, 
    c.Adres, c.email, c.PhoneNumber, o.id as o_id, o.mattress_id,
    o.client_id, o.DepartureDate, o.OrderDate, o.ShippingCosts, 
    o.Amount, o.Status
    FROM Mattress m
    left join Order_ as o on m.id = o.mattress_id
    left join Client as c on c.id = o.client_id
    where m.id = ?`;

    return db.promise().query(query, [id])
        .then((results, fields) => {
            const firstRow = results[0][0];
            console.log('firstRow', firstRow);
            if (!firstRow) {
                return {};
            }
            const mattress = {
                id: firstRow.id,
                Name: firstRow.matName,
                Type: firstRow.matType,
                Size: firstRow.matSize,
                Description: firstRow.matDescription,
                Price: firstRow.matPrice,
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
                        client: {
                            id: row.cid,
                            Name: row.clName,
                            Surname: row.Surname,
                            Adres: row.Adres,
                            email: row.email,
                            PhoneNumber: row.PhoneNumber,
                        }
                    }
                    mattress.orders.push(client_mattress);
                }
            }
            return mattress;
        })
        .catch(err =>{
            console.log(err);
            throw err;
        });
};
exports.createMattress = (newMattressData) => {
    const vRes = matSchema.validate(newMattressData, {abortEarly: false});
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    console.log(newMattressData);
    const Name = newMattressData.Name;
    const Type = newMattressData.Type;
    const Size = newMattressData.Size;
    const Description = newMattressData.Description;
    const Price = newMattressData.Price;
    const query = `insert into Mattress (Name, Type, Size, Description, Price) values (?, ?, ?, ?,?)`;
    return db.promise().execute(query, [Name, Type, Size, Description, Price]);
};
exports.updateMattress = (id, mattressData) => {
    const vRes = matSchema.validate(mattressData, {abortEarly: false});
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const Name = mattressData.Name;
    const Type = mattressData.Type;
    const Size = mattressData.Size;
    const Description = mattressData.Description;
    const Price = mattressData.Price;
    const query = `update Mattress set name = ?, type = ?, size = ?, description = ?, price = ? where id = ?`;
    return db.promise().execute(query, [Name, Type, Size, Description, Price, id]);
};
exports.deleteMattress = (id) => {
    const sql1 = `DELETE FROM Order_ WHERE mattress_id = ?`;
    const sql2 = `DELETE FROM Mattress WHERE id = ?`;

    return db.promise().query(sql1, [id])
        .then(() => {
            return db.promise().query(sql2, [id])
        })
};

