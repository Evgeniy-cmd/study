import axios from 'axios'
import { tokenControl } from './token'

const url = 'http://localhost:5000/'

const instance = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

export const newTask = async (keys) => {
    if (tokenControl()) {
        const responce = await instance.post('task', keys)
        return responce
    }
}

export const getTask = async (params) => {
    if (tokenControl()) {
        const responce = await instance.get(`task?${params}`)
        return responce
    }
}

export const doneTask = async (uuid, keys) => {
    if (tokenControl()) {
        const responce = await instance.patch(`task/${uuid}`, keys)
        return responce
    }
}


export const deleteTask = async (uuid) => {
    if (tokenControl()) {
        const responce = await instance.delete(`task/${uuid}`)
        return responce
    }
}

