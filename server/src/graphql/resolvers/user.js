import {registrateUser} from "../../utils/registrationHelper";
import {loginUser} from "../../utils/loginHelper";
import {isAuthenticated} from "../../utils/isAuthenticated";

export const user = {
    Query: {
        async me(parent, args, {req}, info) {
            return await isAuthenticated(req)
        }
    },
    Mutation: {
        async register(parent, {input}, context, info) {
            try {
                return registrateUser(input)
            } catch (e) {
                throw new Error(e.message)
            }
        },
        async login(parent, {input}, context, info) {
            try {
                return loginUser(input)
            } catch (e) {
                throw new Error(e.message)
            }
        }
    }
}
