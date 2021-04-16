import axios from 'axios'
import { tokenControl } from './token'

const url = 'http://localhost:5000/'

const instance = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        }
    }
)

export const newTask = async (keys) => {
    if (tokenControl()) {
        const response = await instance.post('task', keys)
        console.log(56555)
        return response
    }
}

export const getTask = async (params) => {
    if (tokenControl()) {
        const response = await instance.get(`task?${params}`)
        return response
    }
}

export const doneTask = async (uuid, keys) => {
    if (tokenControl()) {
        const response = await instance.patch(`task/${uuid}`, keys)
        return response
    }
}


export const deleteTask = async (uuid) => {
    if (tokenControl()) {
        const response = await instance.delete(`task/${uuid}`)
        return response
    }
}

