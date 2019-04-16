import { axiosInstance } from './constant'

async function loginUser(username) {  
  try {
      const user = await axiosInstance.post(`/users/login`, {username});
      return { success: true, data: user.data }
  } catch (error) {
     return { success: false }
  }
}

async function fetchUsers(obj) {
 try {
    const users = await axiosInstance.post(`/users`, {_id: obj._id});
    return { success: true, data: users.data }
 } catch (error) {  
   return { success: false }
 }
}

async function sendMessage(message) {
   try {
      const users = await axiosInstance.post(`/message/send`, message);
      return { success: true, data: users.data }
   } catch (error) {  
     return { success: false }
   }
}

export {
   loginUser,
   fetchUsers,
   sendMessage
}