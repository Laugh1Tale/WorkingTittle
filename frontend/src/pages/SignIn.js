import { Link, Routes, Route } from "react-router-dom"
import { SignUp } from './SignUp'
import { HomePage } from './Home'
import { ChatPage } from './Chat'
import '../css/auth.css';

export const SignIn = () => {
    return (
      <body>
        <section className="container forms">
          <div className="form login">
            <div className="form-content">
              <header>Login</header>
              <form action="#">
                <div className="field input-field">
                <input placeholder="Email" type="email" className="input" />
                </div>

                <div className="field input-field">
                  <input placeholder="Password" type="password" classNames="validate" />
                </div>

                <Link to="/home">
                  <button class="field button-field" style={{marginRight: 10}}>Login</button>
                </Link> 

                 <Routes>
                  <Route path="/home" element={<HomePage />} />
                </Routes> 
            
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