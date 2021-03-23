import axios from 'axios'

export const newTask = async() => {
    try {
        return await axios.post('https://todo-api-learning.herokuapp.com/v1/task/2')
    }
    catch(error) {
        console.log(error)
    }       
}    

export const getTask = async() => {
    try {
        return await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2')
    }
    catch(error) {
        console.log(error)
    }
}

export const checkedTask = async() => {
    try{
        return await axios.patch('https://todo-api-learning.herokuapp.com/v1/task/2/90b52d7a-3447-48ac-ac7d-e34085c42e23')
    }
    catch(error) {
        console.log(error)
    }
}

export const deleteTask = async() => {
    try {
        return await axios.delete('https://todo-api-learning.herokuapp.com/v1/task/2/90b52d7a-3447-48ac-ac7d-e34085c42e23')
    }
    catch(error) {
        console.log(error)
    }
}