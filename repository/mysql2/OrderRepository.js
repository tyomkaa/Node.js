const db = require('../../config/mysql2/db');
const orSchema = require("../../model/joi/Order");

exports.getOrders = () =>{
    return db.promise().query('SELECT o.id as o_id, o.DepartureDate, o.OrderDate, o.ShippingCosts, o.Amount, o.Status, mattress.id as mid, mattress.Name as matName,    mattress.Type as matType, mattress.Size as matSize,   mattress.Description as matDescription,    mattress.Price as matPrice, client.id as cid, client.Name as clName, client.Surname,    client.Adres, client.email, client.PhoneNumber, client.password   FROM Order_ o   left join Mattress on o.mattress_id = mattress.id   left join Client on o.client_id = client.id')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.getOrderById = (id) => {
    const query = `SELECT o.id as o_id, o.DepartureDate, o.OrderDate,
    o.ShippingCosts, o.Amount, o.Status, mattress.id as mid, mattress.Name as matName,
    mattress.Type as matType, mattress.Size as matSize, 
    mattress.Description as matDescription, 
    mattress.Price as matPrice, client.id as cid, client.Name as clName, client.Surname, 
    client.Adres, client.email, client.PhoneNumber, client.password
    FROM Order_ o
    left join Mattress on o.mattress_id = mattress.id
    left join Client on o.client_id = client.id
    where o.id = ?`;

    return db.promise().query(query, [id])
        .then((results, fields) => {
            const firstRow = results[0][0];
            console.log('firstRow', firstRow);
            if (!firstRow) {
                return {};
            }
            const order = {
                client: {
                    id: firstRow.cid,
                    Name: firstRow.clName,
                    Surname: firstRow.Surname,
                    Adres: firstRow.Adres,
                    email: firstRow.email,
                    PhoneNumber: firstRow.PhoneNumber,
                    password: firstRow.password,
                },
                mattress: {
                    id: firstRow.mid,
                    Name: firstRow.matName,
                    Type: firstRow.matType,
                    Size: firstRow.matSize,
                    Description: firstRow.matDescription,
                    Price: firstRow.matPrice,
                },
                id: firstRow.o_id,
                DepartureDate: firstRow.DepartureDate,
                OrderDate: firstRow.OrderDate,
                ShippingCosts: firstRow.ShippingCosts,
                Amount: firstRow.Amount,
                Status: firstRow.Status
            };
            return order;
        })
        .catch(err =>{
            console.log(err);
            throw err;
        });
};
exports.createOrder = (newOrderData) => {
    const vRes = orSchema.validate(newOrderData, {abortEarly: false});
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    console.log('newOrderData', newOrderData);
    const sql = `insert into Order_ (client_id, mattress_id,  Amount, Status, ShippingCosts, DepartureDate, OrderDate) values (?, ?, ?, ?, ?, ?, ?)`;
    return db.promise().execute(sql, [newOrderData.Client, newOrderData.Mattress, newOrderData.Amount, newOrderData.Status, newOrderData.ShippingCosts, newOrderData.DepartureDate, newOrderData.OrderDate]);
};
exports.updateOrder = (id, orderData) => {
    const vRes = orSchema.validate(orderData, {abortEarly: false});
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    console.log(orderData);
    const query = `UPDATE Order_ SET client_id = ?, mattress_id = ?, Amount = ?, Status = ?, ShippingCosts = ?, DepartureDate = ?, OrderDate = ? WHERE id = ?`;
    return db.promise().execute(query, [orderData.Client, orderData.Mattress, orderData.Amount, orderData.Status, orderData.ShippingCosts, orderData.DepartureDate, orderData.OrderDate, id]);
};
exports.deleteOrder = (id) => {
    const sql = `DELETE FROM Order_ WHERE id = ?`;

    return db.promise().query(sql, [id])
};

