import axios from 'axios'

const url = 'https://dry-plains-46747.herokuapp.com/'

const instance = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

export const newTask = async (keys) => {
    const responce = await instance.post('task', keys)
    return responce
}

export const getTask = async (params) => {
    const responce = await instance.get(`task?${params}`)
    return responce
}

export const doneTask = async (uuid, keys) => {
    const responce = await instance.patch(`task/${uuid}`, keys)
    return responce
}

export const deleteTask = async (uuid) => {
    const responce = await instance.delete(`task/${uuid}`)
    return responce
}

