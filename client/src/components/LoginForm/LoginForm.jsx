import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
// =====
import { checkAuth, clearAuth } from '../../store/slices/authSlice';
import Schems from '../../utils/validators/validationSchems';
import FormInput from '../FormInput/FormInput';
import styles from './LoginForm.module.sass';
import CONSTANTS from '../../constants';
import Error from '../Error/Error';

function LoginForm(props) {

  useEffect(() => {
    return () => {
      props.authClear();
    }
  }, []);

  const clicked = (values) => {
    props.loginRequest({ data: values, navigate: props.navigate });
  };

    const { error, isFetching } = props.auth;
    const { submitting, authClear } = props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={styles.loginForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={clicked}
          validationSchema={Schems.LoginSchem}
        >
          <Form>
            <FormInput
              classes={formInputClasses}
              name="email"
              type="text"
              label="Email Address"
            />
            <FormInput
              classes={formInputClasses}
              name="password"
              type="password"
              label="Password"
            />
            <button
              type="submit"
              disabled={submitting}
              className={styles.submitContainer}
            >
              <span className={styles.inscription}>
                {isFetching ? 'Submitting...' : 'LOGIN'}
              </span>
            </button>
          </Form>
        </Formik>
      </div>
    );
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: ({ data, navigate }) =>
    dispatch(checkAuth({ data, navigate, authMode: CONSTANTS.AUTH_MODE.LOGIN })),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
