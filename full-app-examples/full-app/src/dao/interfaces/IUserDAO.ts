import { UserDTO } from "../../domain/UserDTO";

export abstract class IUserDAO {
    abstract searchUsers(connectionReference: any, searchCriteria: UserDTO): Promise<Array<UserDTO>>;

    sayHelloInAllDbEngines(connectionReference: any): void {
        console.log("Say Hello In All Engines!!!");
    }
}