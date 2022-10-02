import axios from 'axios'

export const getTiersLists = async (token: string) => {
   const URI = '/api/tiers-lists/getall'
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   try {
      const res = await axios.get(URI, config)
      return res.data
   } catch (error: any) {
      return error.response.data
   }
}

export const getTiersList = async (token: string, body: any) => {
   const URI = '/api/tiers-lists/get'
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   try {
      const res = await axios.post(URI, body, config)
      return res.data
   } catch (error: any) {
      return error.response.data
   }
}

export const createTiersList = async (token: string, body: any) => {
   const URI = '/api/tiers-lists/create'
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   try {
      const res = await axios.post(URI, body, config)
      return res.data
   } catch (error: any) {
      return error.response.data
   }
}

export const deleteTiersList = async (token: string, body: any) => {
   const URI = '/api/tiers-lists/delete'
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   try {
      const res = await axios.post(URI, body, config)
      return res.data
   } catch (error: any) {
      return error.response.data
   }
}

export const updateTiersList = async (token: string, body: any) => {
   const URI = '/api/tiers-lists/update'
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   }

   try {
      const res = await axios.post(URI, body, config)
      return res.data
   } catch (error: any) {
      return error.response.data
   }
}
