import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

function EventForm(props) {

    const dateNow = new Date();
    const initFormDate = `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}T${dateNow.getHours()}:${dateNow.getMinutes()}`;

    const [formDate, setFormDate] = useState(initFormDate);

    return (
        <>
            <Formik
                initialValues={{
                    eventTime: new Date(),
                    title: ''
                }}
                onSubmit={props.handleSubmit}
                innerRef={props.formRef}
            >
                {({values, setFieldValue}) => (
                    <Form>
                        <Field
                            name="eventDate"
                        >
                            {({field}) => (
                                <input 
                                    {...field}
                                    id="eventDate"
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
                        <Field
                            name="title"
                        >
                            {({field}) => (
                                <input 
                                    {...field}
                                    id='title'
                                    type='text'
                                    onChange={({target: {value}}) => setFieldValue('title', value)}
                                    value={values.title}
                                />
                            )}
                        </Field>
                        
                        <button type="submit">Submit</button>
                    </Form>
                )}
                
            </Formik>
        </>
    );
}

export default EventForm;