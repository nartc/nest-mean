import * as roles_decorator from "./roles.decorator"
import * as user_role_enum from "../../user/models/user-role.enum"
// @ponicode
describe("roles_decorator.Roles", () => {
    test("0", () => {
        let param1: any = [user_role_enum.UserRole.Admin, user_role_enum.UserRole.Admin, user_role_enum.UserRole.Admin, user_role_enum.UserRole.Admin]
        let callFunction: any = () => {
            roles_decorator.Roles(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1: any = [user_role_enum.UserRole.Admin, user_role_enum.UserRole.User, user_role_enum.UserRole.User, user_role_enum.UserRole.User]
        let callFunction: any = () => {
            roles_decorator.Roles(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1: any = [user_role_enum.UserRole.User, user_role_enum.UserRole.Admin, user_role_enum.UserRole.Admin]
        let callFunction: any = () => {
            roles_decorator.Roles(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1: any = [user_role_enum.UserRole.User, user_role_enum.UserRole.User, user_role_enum.UserRole.User, user_role_enum.UserRole.User, user_role_enum.UserRole.Admin]
        let callFunction: any = () => {
            roles_decorator.Roles(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1: any = [user_role_enum.UserRole.Admin, user_role_enum.UserRole.Admin, user_role_enum.UserRole.Admin]
        let callFunction: any = () => {
            roles_decorator.Roles(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            roles_decorator.Roles([])
        }
    
        expect(callFunction).not.toThrow()
    })
})
