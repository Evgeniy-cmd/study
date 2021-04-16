import jwt_decode from 'jwt-decode'

export const tokenControl = () => {

    if (localStorage.getItem('token') !== null) {
        // console.log(11111)
        const token = localStorage.getItem('token')
        // console.log(2222)
        const decodeToken = jwt_decode(token)
        // console.log(3333)
        const realTime = new Date().getTime() / 1000

        if (realTime > decodeToken.exp) {
            localStorage.removeItem('token')
            return false
        }
        return true
    }
    return false
} 
// console.log(localStorage)