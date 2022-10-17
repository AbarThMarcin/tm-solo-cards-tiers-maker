import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { updateUser } from '../api/apiUser'
import { useUser } from '../context/UserContext'
import { useNavigateToTop } from '../hooks/useNavigateToTop'

export const Account: React.FC = () => {
   const navigate = useNavigateToTop()
   const { user, setUser } = useUser()
   const [password, setPassword] = useState<string>('')
   const [passwordConf, setPasswordConf] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')

   useEffect(() => {
      if (!localStorage.getItem('user')) navigate('/')
   }, [])

   const handleSubmit = async (e: React.FormEvent<EventTarget>): Promise<void> => {
      e.preventDefault()

      if (loading) return

      if (password !== passwordConf) return setError('Passwords do not match')

      try {
         setError('')
         setLoading(true)

         const { data }: any = await updateUser(user!.token || '', { password })

         localStorage.setItem('user', JSON.stringify(data))
         setUser(data)
         setLoading(false)
      } catch (error) {
         setError('Invalid email address and/or password')
         setLoading(false)
      }
   }

   const handleInput = (
      e: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<string>>
   ): void => {
      setState(e.target.value)
      setError('')
   }

   const handleSignout = () => {
      localStorage.removeItem('user')
      setUser(null)
      navigate('/')
   }

   return (
      <article>
         <section className="section">
            <Form
               style={{ maxWidth: '400px', width: '400px', position: 'relative' }}
               onSubmit={handleSubmit}
            >
               {error && <div className="form-error">{error}</div>}

               <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={user ? user.name : ''} disabled />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={user ? user.email : ''} disabled />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Enter New Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Enter New Password"
                     onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(e, setPassword)
                     }
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPasswordConf">
                  <Form.Label>Re-enter New Password </Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Re-enter New Password"
                     onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(e, setPasswordConf)
                     }
                     required
                  />
               </Form.Group>
               <Button variant="primary" type="submit" disabled={loading}>
                  Submit
               </Button>
            </Form>
            <Button variant="primary" disabled={loading} onClick={handleSignout}>
               Logout
            </Button>
         </section>
      </article>
   )
}
