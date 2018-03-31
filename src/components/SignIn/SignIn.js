import React from 'react'
import { withRouter } from 'react-router-dom'

import { SignUpLink } from 'components/SignUp'
import { PasswordForgetLink } from 'components/PasswordForget'

import SignInForm from './SignInForm';

const SignInPage = ({ history }) => (
    <div>
        <h1>SignIn</h1>
        <SignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
)

export default withRouter(SignInPage);

