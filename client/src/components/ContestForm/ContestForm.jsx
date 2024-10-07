import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// =====
import CONSTANTS from '../../constants';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import withRouter from '../../hocs/withRouter';
import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import Schems from '../../utils/validators/validationSchems';
import OptionalSelects from '../OptionalSelects/OptionalSelects';
import styles from './ContestForm.module.sass';

const variableOptions = {
  [CONSTANTS.NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

function ContestForm(props) {

  const dispatch = useDispatch();

  const isEditContest = useSelector((state) => state.contestByIdStore.isEditContest);
  const dataForContest = useSelector((state) => state.dataForContest);
  const initialValues = props.defaultData;
  // const contestCreationStore = useSelector((state) => state.contestCreationStore);

  const getData = (data) => dispatch(getDataForContest(data));

  const getPreference = () => {
    const { contestType } = props;
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        getData({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        getData({ characteristic1: 'typeOfTagline' });
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        getData({ characteristic1: 'brandStyle' });
        break;
      }
    }
  };

  useEffect(() => {
    getPreference();
  }, [props.contestType]);

  const { isFetching, error } = dataForContest;
  if (error) {
    return <TryAgain getData={getPreference} />;
  }
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <>
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            title: '',
            industry: '',
            focusOfWork: '',
            targetCustomer: '',
            file: '',
            ...variableOptions[props.contestType],
            ...initialValues,
          }}
          onSubmit={props.handleSubmit}
          validationSchema={Schems.ContestSchem}
          innerRef={props.formRef}
          enableReinitialize
        >
          {fProps => {
            const {setFieldValue} = fProps;

            return (
              <Form>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>Title of contest</span>
                  <FormInput
                    name="title"
                    type="text"
                    label="Title"
                    classes={{
                      container: styles.componentInputContainer,
                      input: styles.input,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <SelectInput
                    name="industry"
                    classes={{
                      inputContainer: styles.selectInputContainer,
                      inputHeader: styles.selectHeader,
                      selectInput: styles.select,
                      warning: styles.warning,
                    }}
                    header="Describe industry associated with your venture"
                    optionsArray={dataForContest.data.industry}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    What does your company / business do?
                  </span>
                  <FormTextArea
                    name="focusOfWork"
                    type="text"
                    label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    Tell us about your customers
                  </span>
                  <FormTextArea
                    name="targetCustomer"
                    type="text"
                    label="customers"
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <OptionalSelects {...props} dataForContest={dataForContest} />
                <FieldFileInput
                  name="file"
                  classes={{
                    fileUploadContainer: styles.fileUploadContainer,
                    labelClass: styles.label,
                    fileNameClass: styles.fileName,
                    fileInput: styles.fileInput,
                    warning: styles.warning,
                  }}
                  type="file"
                  setFieldValue = {setFieldValue}
                />
                {isEditContest ? (
                  <button type="submit" className={styles.changeData}>
                    Set Data
                  </button>
                ) : null}
              </Form>
            )
          }}
        </Formik>
      </div>
    </>
  );
}

export default withRouter(ContestForm);
