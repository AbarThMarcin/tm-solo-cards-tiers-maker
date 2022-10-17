import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { signup } from '../api/apiUser'
import { LinkToTop } from '../components/LinkToTop'
import { useUser } from '../context/UserContext'
import { useNavigateToTop } from '../hooks/useNavigateToTop'

interface Props {
   tiersClicked: boolean
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const Signup: React.FC<Props> = ({ tiersClicked, setTiersClicked }) => {
   const navigate = useNavigateToTop()
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
      <section className="section signin-section-content article-section-content">
         <Form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <Form.Group className="mb-3" controlId="formBasicUsername">
               <Form.Label>Username</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e, setUsername)}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e, setEmail)}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e, setPassword)}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConf">
               <Form.Label>Re-enter Password </Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Re-enter password"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                     handleInput(e, setPasswordConf)
                  }
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Text>
                  Already have an account? <LinkToTop to="/signin">Sign In</LinkToTop>
               </Form.Text>
            </Form.Group>
            <button type="submit" className='button-signin' disabled={loading}>
               CREATE ACCOUNT
            </button>
         </Form>
      </section>
   )
}
