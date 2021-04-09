import axios from 'axios'

const url = 'https://aqueous-cove-57786.herokuapp.com/api/'

const instance = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

export const newTask = async (keys) => {
    const responce = await instance.post('tasks', keys)
    return responce
}

export const getTask = async () => {
    const responce = await instance.get(`tasks`)
    return responce
}

export const doneTask = async (uuid, keys) => {
    const responce = await instance.patch(`tasks/${uuid}`, keys)
    return responce
}

export const deleteTask = async (uuid) => {
    const responce = await instance.delete(`tasks/${uuid}`)
    return responce
}

