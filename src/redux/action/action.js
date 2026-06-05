export const LOGIN ='LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP='SIGNUP';

export const login = (form) =>{
    return{
        type:LOGIN,
        payload:form
    }
}
export const logout =()=>{
    return{
        type:LOGOUT
    }
}
export const signup = (form) =>{
    return {
        type:SIGNUP,
        payload:form
    }
}