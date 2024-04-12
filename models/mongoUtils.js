//Modelo de la base de datos
const mongoClient = require("mongodb").MongoClient;
const config = require("./config");

module.exports = class MongoUtils {
    getConnectionString() {
        return config.mongo.url;
    }

    getDataBaseString() {
        return config.mongo.database;
    }

    getCollectionString() {
        return config.mongo.collection;
    }

    buildCollection(firstName, lastName, ci, phone, email, student, season, ip, pay) {
        return {
            firstName, 
            lastName, 
            ci, 
            phone, 
            email, 
            student,
            season,
            ip,
            pay
        }
    }

    buildCollectionPago(firstName, lastName, ci, reference, pay) {
        return {
            firstName, 
            lastName, 
            ci, 
            reference,
            pay
        }
    }

    buildCollectionFind(ci) {
        return {
            ci
        }
    }

    buildCollectionFindAll() {
        return {
            
        }
    }

    async insertData(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection(this.getCollectionString());

                collection.insertOne(data, (insertError, insertResponse) => {
                    if (insertError) reject(insertError);
                    resolve(insertResponse);
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async insertDataPago(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection('pagos');

                collection.insertOne(data, (insertError, insertResponse) => {
                    if (insertError) reject(insertError);
                    resolve(insertResponse);
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async insert(firstName, lastName, ci, phone, email, student, season, ip, pay){
        let data = this.buildCollection(firstName, lastName, ci, phone, email, student, season, ip, pay);
        console.log(data);
        return await this.insertData(data);
    }

    async insertPago(firstName, lastName, ci, reference, pay){
        let data = this.buildCollectionPago(firstName, lastName, ci, reference, pay);
        console.log(data);
        return await this.insertDataPago(data);
    }
//, all = false
    async findData(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection(this. getCollectionString());

                const find = collection.find(data);
                const results = [];

                find.each((err, doc) => {
                    if (err) {
                        reject(err);
                    } else if (doc !== null) {
                        results.push(doc);
                    } else {
                        resolve(results);
                    }
                });
            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }
/* if(err) reject(err);
                    if (doc == null) all = false;
                    if(all) resolve(doc);                                            
                    else resolve(doc); */
    async findDataPago(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection('pagos');

                const find = collection.find(data);
                const pays = [];

                find.each((err, doc) => {
                    if (err) {
                        reject(err);
                    } else if (doc !== null) {
                        pays.push(doc);
                    } else {
                        //console.log(pays);
                        resolve(pays);
                    }
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async deleteData(filter) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {
            const db = client.db(this.getDataBaseString());
            const collection = db.collection('pagos');

            collection.deleteOne(filter,(err, result) => {
                if (err) reject(err);
                resolve(result);
            });

            }).catch(err => {
            console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async updateData(filter, update) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {
            const db = client.db(this.getDataBaseString());
            const collection = db.collection('pagos');

            collection.updateOne(filter, update, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });

            }).catch(err => {
            console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }
    
    async update(fields, updates){
        return await this.updateData(fields, updates);
    }

    async delete(field){
        return await this.deleteData(field);
    }
    
    /* const filter = { name: 'John' };

    // Definir los cambios que se realizarán en los documentos
    const update = { $set: { age: 30 } };

    // Actualizar un solo documento
    const result = await collection.updateOne(filter, update);
    console.log(result); */

        /* const filter = { name: 'John' };

        // Definir los cambios que se realizarán en los documentos
        const update = { $set: { age: 30 } }; */

    async find(ci){
        let data = this.buildCollectionFind(ci);
        //console.log(data);
        return await this.findData(data);
    }

    async findAll(){
        let data = this.buildCollectionFindAll({});
        //console.log(data);
        return await this.findData(data);
    }

    async findAllPay(){
        let data = this.buildCollectionFindAll({});
        //console.log(data);
        return await this.findDataPago(data);
    }

    async findPago(ci){
        let data = this.buildCollectionFind(ci);
        //console.log(data);no sé
        return await this.findDataPago(data);
    }
}
