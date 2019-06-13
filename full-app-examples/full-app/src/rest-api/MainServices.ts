import { UserService } from './UserService';
import * as express from "express";

export class MainServices {
    public constructor(applicationRouter: express.Router) {
        new UserService(applicationRouter);
    }
}