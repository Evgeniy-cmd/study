import axios from 'axios'


export const newTask = async(userId, keys) => {
    return await axios.post(`https://aqueous-cove-57786.herokuapp.com/api/tasks`, keys)    
}    

export const getTask = async(userId) => {
    return await axios.get(`https://aqueous-cove-57786.herokuapp.com/api/tasks`)
}

export const doneTask = async(userId, uuid, keys) => {
    return await axios.patch(`https://aqueous-cove-57786.herokuapp.com/api/tasks/${uuid}`, keys)  
}

export const deleteTask = async(userId, uuid) => {
      return await axios.delete(`https://aqueous-cove-57786.herokuapp.com/api/tasks/${uuid}`)  
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
  