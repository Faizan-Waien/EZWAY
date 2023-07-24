import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    UserName: '',
    FullName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  })

  const [alert, setAlert] = useState('')

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })
  }

  const signup = (e) => {
    e.preventDefault()

    setAlert('Verify Email and SignIn')
    setTimeout(() => {
      setAlert('')
    }, 1000);
  }
  
  // -------------------------------------

  const [login, setLogin] = useState({
    user: '',
    pass: '',
  })

  const handleLogin = (e) => {
    const name = e.target.name
    const value = e.target.value
    setLogin({ ...login, [name]: value })
  }

  const signin = () => {
    if (login.user === 'admin' && login.pass === '123') {
      navigate('/home')
    } else {
      setAlert('Invalid Username or Passwaord')
      setTimeout(() => {
        setAlert('')
      }, 1000);
    }
  }

  return (

    <div style={{ background: 'url(/src/assets/main.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '100vw', height: '100vh', position: 'fixed' }}>

      <div className='form'>

        <div id='sup' style={{ display: 'block' }}>

          <h2>SIGN-UP</h2>

          <form onSubmit={signup}>
            <input type='text' onChange={handleInputs} value={userData.UserName} name='UserName' id='UserName' placeholder='User Name' required />

            <input type='text' onChange={handleInputs} value={userData.FullName} name='FullName' id='FullName' placeholder='Full Name' required />

            <input type='text' onChange={handleInputs} value={userData.Email} name='Email' id='Email' placeholder='Email Address' required />

            <input type='password' onChange={handleInputs} value={userData.Password} name='Password' id='Password' placeholder='Password' required />

            <input type='password' onChange={handleInputs} value={userData.ConfirmPassword} name='ConfirmPassword' id='ConfirmPassword' placeholder='Confirm Password' required />

            <button type='submit'>SIGNUP</button>
          </form>

          {alert && <p style={{ margin: 0, color: 'white', fontSize: 'small' }}>{alert}</p>}

          <p style={{ color: 'gray', textAlign: 'right', fontSize: 'small' }}>Already registered?
            <span onClick={() => { document.getElementById('sin').style.display = 'block'; document.getElementById('sup').style.display = 'none' }}> SignIn</span></p>

        </div>

        {/* ---------------------------------- */}

        <div id='sin' style={{ display: 'none' }}>

          <h2>SIGN-IN</h2>

          <input type='text' onChange={handleLogin} value={login.user} name='user' id='user' placeholder='Username' required />

          <input type='text' onChange={handleLogin} value={login.pass} name='pass' id='pass' placeholder='Password' required />

          <button onClick={signin}>SIGNUP</button>

          {alert && <p style={{ margin: 0, color: 'white', fontSize: 'small' }}>{alert}</p>}

          <p style={{ color: 'gray', textAlign: 'right', fontSize: 'small' }}>Not registered?
            <span onClick={() => { document.getElementById('sup').style.display = 'block'; document.getElementById('sin').style.display = 'none' }}> SignUp</span></p>

        </div>

        <div style={{ cursor: 'pointer', padding: '0px 10px', background: '#ffffff1a' }} onClick={() => navigate('/home')}>
          <h1 style={{ color: '#a1b9b7', margin: 0 }}>GO SHOPPING</h1>
          <p style={{ color: 'white', fontSize: 'small', margin: 0 }}>Enter without Login</p>
        </div>

      </div>
    </div>
  )
}
export default SignUp