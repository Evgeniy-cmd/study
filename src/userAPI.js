import axios from 'axios'

export const newTask = async(userId) => {
    try {
        return await axios.post(`https://todo-api-learning.herokuapp.com/v1/task/${userId}`)
    }
    catch(error) {
        console.log(error)
    }       
}    

export const getTask = async(userId) => {
    try {
        return await axios.get(`https://todo-api-learning.herokuapp.com/v1/tasks/${userId}`)
    }
    catch(error) {
        console.log(error)
    }
}

export const checkedTask = async(userId, uuid) => {
    try{
        return await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/${userId}/${uuid}`)
    }
    catch(error) {
        console.log(error)
    }
}

export const deleteTask = async(userId, uuid) => {
    try {
        return await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/${userId}/${uuid}`)
    }
    catch(error) {
        console.log(error)
    }
}