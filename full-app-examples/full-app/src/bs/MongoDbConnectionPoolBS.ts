import { DatabaseConnectionDTO } from "../domain/DatabaseConnectionDTO";
import { MongoDBConnectionPoolDAO } from "../dao/singleton/MongoDBConnectionPoolDAO";

export class MongoDBConnectionPoolBS {

    public constructor() {

    }

    public getConnection(configurationPool: DatabaseConnectionDTO): Promise<any> {

        return new Promise((resolve, reject) => {
            try {
                MongoDBConnectionPoolDAO.getInstance(configurationPool)
                    .then(
                        (daoInstance) => {
                            if (daoInstance.getFirstInstance()) {
                                daoInstance.getConnectionPool()
                                    .then(
                                        (connection) => {
                                            resolve(connection);
                                        });
                            } else {
                                daoInstance.getConnectionPool()
                                    .then(
                                        (connection) => {
                                            resolve(connection);
                                        }
                                    );
                            }
                        });
            } catch(Exception) {
                reject(Exception);
            }
        });   
    }
}