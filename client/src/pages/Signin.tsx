import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { signin } from '../api/apiUser'
import { LinkToTop } from '../components/LinkToTop'
import { useUser } from '../context/UserContext'
import { useNavigateToTop } from '../hooks/useNavigateToTop'

interface Props {
   tiersClicked: boolean
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const Signin: React.FC<Props> = ({ tiersClicked, setTiersClicked }) => {
   const navigate = useNavigateToTop()
   const { setUser } = useUser()
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')

   useEffect(() => {
      if (localStorage.getItem('user')) navigate('/')
   }, [])

   const handleSubmit = async (e: React.FormEvent<EventTarget>): Promise<void> => {
      e.preventDefault()

      if (loading) return

      try {
         setError('')
         setLoading(true)

         const { data }: any = await signin(email, password)

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

   const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(e.target.value)
      setError('')
   }

   const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(e.target.value)
      setError('')
   }

   return (
      <section className="section signin-section-content article-section-content">
         <Form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  onInput={handleInputEmail}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onInput={handleInputPassword}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Text>
                  Don't have an account? <LinkToTop to="/signup">Sign Up</LinkToTop>
               </Form.Text>
            </Form.Group>
            <button type="submit" className='button-signin' disabled={loading}>
               SIGN IN
            </button>
         </Form>
      </section>
   )
}
