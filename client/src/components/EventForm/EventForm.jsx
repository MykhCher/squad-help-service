import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
// =====
import styles from './EventForm.module.sass';
import Schems from '../../utils/validators/validationSchems';


function EventForm(props) {

    const dateNow = new Date();
    const setInitFormDate = () => {
        const m = dateNow.getMinutes()
        return `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}T${dateNow.getHours()}:${m < 10 ? `0${m}` : m}`;
    }

    const [formDate, setFormDate] = useState(setInitFormDate());

    return (
        <>
            <h2>Create Event:</h2>
            <Formik
                initialValues={{
                    eventTime: new Date(),
                    title: ''
                }}
                onSubmit={props.handleSubmit}
                innerRef={props.formRef}
                validationSchema={Schems.EventSchem}
            >
                {({values, setFieldValue, errors, touched}) => (
                    <Form>
                        <div className={styles.inputContainer}>
                            <label htmlFor="eventDate">Time for event:</label>
                            <Field
                                name="eventDate"
                            >
                                {({field}) => (
                                    <input 
                                        {...field}
                                        id="eventDate"
                                        className={styles.formInput}
                                        aria-label="Date and time" 
                                        type="datetime-local" 
                                        onChange={({target: {value}}) => {
                                            const newDate = new Date(value);

                                            setFieldValue('eventTime', newDate);
                                            setFormDate(value);
                                        }}
                                        value={formDate}
                                    />
                                )}
                            </Field>
                            <ErrorMessage className={styles.errorMsg} name="eventTime" component='span'/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="title">Event name:</label>
                            <Field
                                name="title"
                            >
                                {({field}) => (
                                    <input 
                                        {...field}
                                        id='title'
                                        className={styles.formInput}
                                        placeholder='My Event'
                                        type='text'
                                        onChange={({target: {value}}) => setFieldValue('title', value)}
                                        value={values.title}
                                    />
                                )}
                            </Field>
                            {errors.title && touched.title ? (
                                <div>{errors.title}</div>
                            ) : null}
                            <ErrorMessage className={styles.errorMsg} name="title" component='span'/>
                        </div>
                        <button type="submit" className={styles.submitBtn}>Create</button>
                    </Form>
                )}
                
            </Formik>
        </>
    );
}

export default EventForm;