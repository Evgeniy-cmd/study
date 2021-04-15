import jwt_decode from 'jwt-decode'

export const tokenControl = () => {

    if (localStorage.getItem('token') !== null) {
        const token = localStorage.getItem('token')
       
        const decodeToken = jwt_decode(token)

        const realTime = new Date().getTime() / 1000

        if (realTime > decodeToken.exp) {
            localStorage.removeItem('token')
            return false
        }
        return true
    }
    return false
} 
console.log(localStorage)