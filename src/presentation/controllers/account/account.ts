import { IController, IValidator } from "../../protocols";
import { THttpRequest } from "../../models/http-req-res";

export class AccountController implements IController{

    getAll(req: THttpRequest): Promise<import("../../models/http-req-res").THttpResponse> {
        throw new Error("Method not implemented.");
    }
    getById(req: THttpRequest): Promise<import("../../models/http-req-res").THttpResponse> {
        throw new Error("Method not implemented.");
    }
    create(req: THttpRequest): Promise<import("../../models/http-req-res").THttpResponse> {
        throw new Error("Method not implemented.");
    }
    update(req: THttpRequest): Promise<import("../../models/http-req-res").THttpResponse> {
        throw new Error("Method not implemented.");
    }
    delete(req: THttpRequest): Promise<import("../../models/http-req-res").THttpRequest> {
        throw new Error("Method not implemented.");
    }
    
}