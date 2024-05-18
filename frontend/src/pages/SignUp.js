import { Link, Routes, Route } from "react-router-dom"
import 'materialize-css';
import { SignIn } from "./SignIn"
import { HomePage } from './Home'
import '../css/auth.css';

export const SignUp = () => {
    return (
      <body>
        <section className="container forms">
          <div className="form signup">
            <div className="form-content">
              <header>Signup</header>
              <form action="#">
                <div className="field input-field">
                  <input placeholder="Name" />
                </div>

                <div className="field input-field">
                  <input placeholder="Last Name" />
                </div>

                <div className="field input-field">
                <input placeholder="Email" type="email" className="input" />
                </div>

                <div className="field input-field">
                  <input placeholder="Password" type="password" classNames="validate" />
                </div>

                <Link to="/home">
                  <button class="field button-field">SignUp</button>
                </Link>

                <Routes>
                  <Route path="/home" element={<HomePage />} />
                </Routes>

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