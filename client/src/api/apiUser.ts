import axios from 'axios'

export const signin = async (email: string, password: string) => {
   const URI = '/api/users/signin'
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }

   try {
      const res = await axios.post(URI, { email, password }, config)
      return res
   } catch (error: any) {
      console.log(
         error.response && error.response.data.message ? error.response.data.message : error.message
      )
   }
}

export const signup = async (name: string, email: string, password: string) => {
   const URI = '/api/users/signup'
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }

   try {
      const res = await axios.post(URI, { name, email, password }, config)
      return res
   } catch (error: any) {
      console.log(
         error.response && error.response.data.message ? error.response.data.message : error.message
      )
   }
}

export const updateUser = async (token: string, details: any) => {
   const URI = '/api/users/update'
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   try {
      const res = await axios.post(URI, details, config)
      return res
   } catch (error: any) {
      console.log(
         error.response && error.response.data.message ? error.response.data.message : error.message
      )
   }
}
