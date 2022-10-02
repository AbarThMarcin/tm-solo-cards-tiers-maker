import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/apiUser'
import { useUser } from '../context/UserContext'

interface Props {
   tiersClicked: boolean
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const Signup: React.FC<Props> = ({ tiersClicked, setTiersClicked }) => {
   const navigate = useNavigate()
   const { setUser } = useUser()
   const [username, setUsername] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [passwordConf, setPasswordConf] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')

   useEffect(() => {
      if (localStorage.getItem('user')) navigate('/')
   }, [])

   const handleSubmit = async (e: React.FormEvent<EventTarget>): Promise<void> => {
      e.preventDefault()

      if (loading) return

      if (password !== passwordConf) return setError('Passwords do not match')

      try {
         setError('')
         setLoading(true)

         const { data }: any = await signup(username, email, password)

         localStorage.setItem('user', JSON.stringify(data))
         setUser(data)
         if (tiersClicked) {
            setTiersClicked(false)
            navigate('/lists')
         } else {
            navigate('/')
         }

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

   return (
      <section className="section">
         <Form
            style={{ maxWidth: '400px', width: '400px', position: 'relative' }}
            onSubmit={handleSubmit}
         >
            {error && <div className="form-error">{error}</div>}

            <Form.Group className="mb-3" controlId="formBasicUsername">
               <Form.Label>Enter Username</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e, setUsername)}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e, setEmail)}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Enter Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e, setPassword)}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConf">
               <Form.Label>Re-enter Password </Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Re-enter Password"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                     handleInput(e, setPasswordConf)
                  }
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Text>
                  Already have an account? <Link to="/signin">Sign In</Link>
               </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
               Submit
            </Button>
         </Form>
      </section>
   )
}
