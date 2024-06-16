import { Link, Routes, Route } from "react-router-dom"
import { SignUp } from './SignUp'
import { HomePage } from './Home'
import { App } from '../App'
import { ChatPage } from './Chat'
import '../css/auth.css';

export const SignIn = (setIsAuth) => {
  const changeIsAuth = () => {
    window.location.href = '/home';
  } 

    return (
      <body>
        <section className="container forms">
          <div className="form login">
            <div className="form-content">
              <header>Login</header>
              <form action="/home" onSubmit={()=>changeIsAuth()}>
                <div className="field input-field">
                <input required placeholder="Email" type="email" className="input" />
                </div>

                <div className="field input-field">
                  <input pattern=".{8,}" required placeholder="Password" type="password" classNames="validate" />
                </div>

                {/* <Link to="/home"> */}
                  {/* <input type="submit"  onClick={changeIsAuth} class="field button-field" style={{marginRight: 10}}>Login</input> */}
                {/* </Link>  */}
                <button type="submit"  class="field button-field" style={{marginRight: 10}}>login</button>

                 {/* <Routes>
                  <Route path="/home" onClick={()=>changeIsAuth()} element={<ChatPage />}/>
                </Routes>  */}
            
                <div class="form-link">
                  <span>Don't have an account? <a href="/sign-up" class="link signup-link">Signup</a></span>
                </div>

                <Routes>
                  <Route path="/sign-up" element={<SignUp />} />
                </Routes>
              </form>
            </div>
          </div>
        </section>
      </body>
    )
}