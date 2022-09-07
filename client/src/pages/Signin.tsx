import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../api/apiUser'
import { UserInterface } from '../App'

interface Props {
   setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}

export const Signin: React.FC<Props> = ({ setUser }) => {
   const navigate = useNavigate()
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')

   useEffect(() => {
      if (localStorage.getItem('user')) navigate('/')
   }, [])

   const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
      e.preventDefault()

      if (loading) return

      try {
         setError('')
         setLoading(true)

         const { data }: any = await signin(email, password)

         localStorage.setItem('user', JSON.stringify(data))
         setUser(data)
         navigate('/')

         setLoading(false)
      } catch (error) {
         setError('Invalid email address and/or password')
         setLoading(false)
      }
   }

   const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      setError('')
   }

   const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      setError('')
   }

   return (
      <section>
         <Form style={{ maxWidth: '400px', width: '400px', position: 'relative' }} onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control type="email" placeholder="Enter email" onInput={handleInputEmail} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" placeholder="Password" onInput={handleInputPassword} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Text>
                  Don't have an account?{' '}
                  <Link to='/signup'>Sign Up</Link>
               </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
               Submit
            </Button>
         </Form>
      </section>
   )
}
