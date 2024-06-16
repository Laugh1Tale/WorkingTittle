import { Link, Routes, Route } from "react-router-dom"
import 'materialize-css';
import { SignIn } from "./SignIn"
import { HomePage } from './Home'
import '../css/auth.css';

export const SignUp = () => {
  const changeIsAuth = () => {
    window.location.href = '/home';
  } 

    return (
      <body>
        <section className="container forms">
          <div className="form signup">
            <div className="form-content">
              <header>Signup</header>
              <form action="/home">
                <div className="field input-field">
                  <input placeholder="Name" />
                </div>

                <div className="field input-field">
                  <input placeholder="Last Name" />
                </div>

                <div className="field input-field">
                <input required placeholder="Email" type="email" className="input" />
                </div>

                <div className="field input-field">
                  <input title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required placeholder="Password" type="password" classNames="validate" />
                </div>

                <button type="submit"  class="field button-field" style={{marginRight: 10}}>SignUp</button>

{/* 
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                </Routes> */}

                <div class="form-link">
                  <span>Already have an account? <a href="/sign-in" class="link login-link">Login</a></span>
                </div>

                <Routes>
                  <Route path="/sign-in" element={<SignIn />} />
                </Routes>
              </form>
            </div>
          </div>
        </section>
      </body>
    )
}