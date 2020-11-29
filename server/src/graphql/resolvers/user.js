import {registrateUser} from "../../utils/registrationHelper";
import {loginUser} from "../../utils/loginHelper";

export const user = {
    Query: {
        user() {
            return {name: 'User'}
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
