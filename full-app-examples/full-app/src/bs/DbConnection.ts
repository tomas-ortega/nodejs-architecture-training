import { DatabaseConnectionDTO } from "../domain/DatabaseConnectionDTO";
import { MongoDBConnectionPoolBS } from "./MongoDbConnectionPoolBS";
import { MySqlDbConnectionPoolBS } from "./MySqlDbConnectionPoolBS";

export class DbConnection {

    private static getMysqlConnection(): Promise<any> {
        let mySqlConnectionPoolBS: MySqlDbConnectionPoolBS;

        let mysqlPoolConfiguration: DatabaseConnectionDTO;
        
        return new Promise((resolve, reject) => {
            try {
                mySqlConnectionPoolBS = new MySqlDbConnectionPoolBS();
                mysqlPoolConfiguration = new DatabaseConnectionDTO();
                mysqlPoolConfiguration.getMySqlConnectionData();

                mySqlConnectionPoolBS.getConnection(mysqlPoolConfiguration)
                    .then(
                        (mysqlConnection) => {
                            console.log("CONNECTION: " + mysqlConnection);
                            resolve(mysqlConnection);
                        }
                    );
    
            } catch(Exception) {
                reject(Exception);
            }
        });
    }

    public static closeConnection(connectionReference: any) {
        let connectionType: string = process.env.DATABASE_TYPE;
        connectionType = "MONGODB";

        if (connectionType === 'MYSQL') {
            if (connectionReference != null) {
                connectionReference.release();
                console.log("Connection Release!");
            }
        } else if (process.env.DATABASE_TYPE === 'MONGODB') {
            if (connectionReference != null) {
                connectionReference.close(() => {
                    console.log("Connection MongoDb Release!");
                });
            }
        }
    }

    public static getDbConnection(): Promise<any> {
        let databaseType: string = process.env.DATABASE_TYPE;

        databaseType = "MONGODB";

        if (databaseType === 'MYSQL') {
            return DbConnection.getMysqlConnection();
        } else if (databaseType === 'MONGODB') {
            return DbConnection.getMongoDBConnection();
        } else {
            return new Promise((resolve, reject) => {resolve('Database Not Match!')});
        }
    }

    private static getMongoDBConnection(): Promise<any> {
        let mongoDbConnectionPoolBS: MongoDBConnectionPoolBS;
        let mongoDbPoolConfiguration: DatabaseConnectionDTO;
        
        return new Promise((resolve, reject) => {
            try {
                
                mongoDbConnectionPoolBS = new MongoDBConnectionPoolBS();

                mongoDbPoolConfiguration = new DatabaseConnectionDTO();
                mongoDbPoolConfiguration.getMongoDbConnectionData();

                mongoDbConnectionPoolBS.getConnection(mongoDbPoolConfiguration)
                        .then(
                            (mongoDbConnection) => {
                                console.log("MONGO CONNECTION: " , mongoDbConnection);
                                resolve(mongoDbConnection);
                            }
                        )
                        
                    
            } catch (Exception) {
                reject(Exception);
            }
        });
    }
}