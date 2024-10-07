import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// =====
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { clearAuthError } from '../../store/slices/authSlice';
import styles from './RegistrationPage.module.sass';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(clearAuthError());


  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <RegistrationForm navigate={navigate} />
      </div>
    </div>
  );
};



export default RegistrationPage;
