import { DatabaseConnectionDTO } from "../domain/DatabaseConnectionDTO";
import { MySqlDBConnectionPoolDAO } from "../dao/singleton/MySqlDBConnectionPoolDAO";

export class MySqlDbConnectionPoolBS {
    public constructor() {

    }

    public getConnection(configurationPool: DatabaseConnectionDTO): Promise<any> {

        return new Promise((resolve, reject) => {
            try {
                MySqlDBConnectionPoolDAO.getInstance(configurationPool)
                    .then(
                        (daoInstance) => {
                            daoInstance.getConnectionPool().getConnection((error, connection) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(connection);
                                }
                            });
                        });
            } catch(Exception) {
                reject(Exception);
            }
        });
    }
}