import {registrateUser} from "../../utils/registrationHelper";

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
        }
    }
}
