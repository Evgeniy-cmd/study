import axios from 'axios'

const url = 'https://dry-plains-46747.herokuapp.com/'

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

