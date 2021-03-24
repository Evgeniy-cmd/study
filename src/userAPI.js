import axios from 'axios'


export const newTask = async(userId, keys) => {
    return await axios.post(`https://todo-api-learning.herokuapp.com/v1/task/${userId}`, keys)    
}    

export const getTask = async(userId) => {
    return await axios.get(`https://todo-api-learning.herokuapp.com/v1/tasks/${userId}`)
}

export const doneTask = async(userId, uuid, keys) => {
    return await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/${userId}/${uuid}`, keys)  
}

export const deleteTask = async(userId, uuid) => {
      return await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/${userId}/${uuid}`)  
}

axios.interceptors.response.use((response) => {
    if(response.status !== 200 && response.status !== 204){
       return alert(`Error: ${response.status}`)
    }
    return response
  }, 
  error => {
    return error
  })
  