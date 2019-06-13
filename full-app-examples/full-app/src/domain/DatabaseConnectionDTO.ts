export class DatabaseConnectionDTO {
    public hostName: string;
    public port: number;
    public databaseName: string;
    public server: string;
    public userName: string;
    public password: string;

    public getMySqlConnectionData() {
        this.hostName = "localhost";
        this.port = 3306;
        this.databaseName = 'hosting';
        this.userName = 'root';
        this.password = 'lv(u3WrVVhhc';
    }

    public getMongoDbConnectionData() {
        this.hostName = "localhost";
        this.port = 27017;
        this.databaseName = null;
    }
}