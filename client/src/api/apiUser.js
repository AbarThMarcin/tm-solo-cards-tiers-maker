import axios from 'axios'

export const signin = async (email, password) => {
   const URI = '/api/users/signin'
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }

   try {
      const res = await axios.post(URI, { email, password }, config)
      return res
   } catch (error) {
      console.log(
         error.response && error.response.data.message ? error.response.data.message : error.message
      )
   }
}

export const signup = async (name, email, password) => {
   const URI = '/api/users/signup'
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }

   try {
      const res = await axios.post(URI, { name, email, password }, config)
      return res
   } catch (error) {
      console.log(
         error.response && error.response.data.message ? error.response.data.message : error.message
      )
   }
}
