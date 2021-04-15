import axios from 'axios'

const url = 'http://localhost:5000/'

const instanceUsers = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

export const postUser = async (keys) => {
    const response = await instanceUsers.post(`user/` + keys.typeRequest, keys)
    return response 
}

