import React from 'react'
import { useContext } from 'react'
import UserContext from '../../UserContext'
import { useNavigate } from 'react-router-dom'
const SignOut = () => {
    const navigate = useNavigate()
    const values = useContext(UserContext)
    const [user,setUser] = values
    
    const logOut = ()=>{
        setUser('guest')
        navigate('/')
    }
  return (
    <div>
       <button type='submit' onClick={logOut}>Touch me to logout</button>
        
    </div>
  )
}

export default SignOut
