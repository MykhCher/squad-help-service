import { connect } from 'react-redux';
import { Form, Formik, Field } from 'formik';
import classNames from 'classnames';
// =====
import { sendMessage } from '../../../../store/slices/chatSlice';
import styles from './ChatInput.module.sass';
import CONSTANTS from '../../../../constants';
import Schems from '../../../../utils/validators/validationSchems';

const ChatInput = (props) => {
  const submitHandler = (values, { resetForm }) => {
    props.sendMessage({
      messageBody: values.message,
      recipient: props.interlocutor.id,
      interlocutor: props.interlocutor,
    });
    resetForm();
  };

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
        validationSchema={Schems.MessageSchema}
      >
        <Form className={styles.form}>
          <Field name="message">
            {props => {
              const {field, meta: { touched, error }} = props;

              const inputClassName = classNames(styles.input);

              return (
                <div className={styles.container}>

                  <input
                    name='message'
                    type='text'
                    placeholder="message"
                    className={inputClassName}
                    autoComplete='off'
                    {...field}
                  />
                </div>
              )
            }}
          </Field>
          <button type="submit">
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}send.png`}
              alt="send Message"
            />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor } = state.chatStore;
  const { data } = state.userStore;
  return { interlocutor, data };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (data) => dispatch(sendMessage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
