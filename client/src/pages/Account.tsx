import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
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
   const [success, setSuccess] = useState<string>('')

   useEffect(() => {
      if (!localStorage.getItem('user')) navigate('/')
   }, [])

   const handleSubmit = async (e: React.FormEvent<EventTarget>): Promise<void> => {
      e.preventDefault()

      if (loading) return

      if (password !== passwordConf) return setError('Passwords do not match')

      try {
         setError('')
         setSuccess('')
         setLoading(true)

         const { data }: any = await updateUser(user!.token || '', { password })

         localStorage.setItem('user', JSON.stringify(data))
         setUser(data)
         setLoading(false)
         setSuccess('Changes applied successfully!')
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
      setSuccess('')
   }

   const handleSignout = () => {
      localStorage.removeItem('user')
      setUser(null)
      navigate('/')
   }

   return (
      <article>
         <section className="auth-bg"></section>
         <section className="section form-section-content article-section-content">
            <header style={{ translate: '0 -50%' }}>
               <h1>ACCOUNT DETAILS</h1>
            </header>
            <Form onSubmit={handleSubmit} className="mb-4">
               {error && <div className="form-error">{error}</div>}
               {success && <div className="form-success">{success}</div>}
               <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={user ? user.name : ''} disabled />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={user ? user.email : ''} disabled />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
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
               <button type="submit" className="button-submit" disabled={loading}>
                  APPLY CHANGES
               </button>
               <button
                  style={{ zIndex: 1 }}
                  className="button-submit red"
                  onClick={handleSignout}
                  disabled={loading}
               >
                  LOGOUT
               </button>
            </Form>
         </section>
      </article>
   )
}
