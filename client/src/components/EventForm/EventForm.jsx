import { Formik, Form, Field } from 'formik';

function EventForm() {

    return (
        <>
            <Formik
                initialValues={{
                    eventDateForm: '',
                    eventTime: '',
                    title: ''
                }}
                onSubmit={values => console.log(values)}
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
                                        const newDate = new Date(value)

                                        setFieldValue('eventTime', newDate);
                                        setFieldValue('eventDateForm', value);
                                    }}
                                    value={values.eventDateForm}
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