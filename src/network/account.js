import { axiosInstance, network } from './constant'

async function loginWithEmail(data) {
   try {
         const response = await axiosInstance.post(`/auth/login/email`, data)
         return { success: true }
     } catch (error) {
        if(error.response) {
           const { data } = error.response
           const { email, password } = data
           if(email){ return { success: false, data: 'Email not found. check your email and try again' } }
           if(password) { return { success: false, data: 'Incorrect password. check your password and try again' } }
           return { success: false, data: 'User not found' }
        } else {
         return { success: false, data: network }
        }
   }
}

export {
   loginWithEmail
}