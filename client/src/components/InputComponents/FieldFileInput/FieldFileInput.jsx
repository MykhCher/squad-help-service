import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={rest.name}>
      {props => {
        const { field } = props;

        const getFileName = () => {
          if (props.field.value) {
            return props.field.value.name;
          }
          return '';
        };

        const handleFileChange = (event) => {
          const reader = new FileReader();
          const file = event.currentTarget.files[0];

          reader.onloadend = () => {
            rest.setFieldValue(field.name, file);
            document.getElementById('imagePreview').src = reader.result;
          };

          reader.readAsDataURL(file);
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <img id="imagePreview" alt="Image Preview" />
            <input
              {...field}
              value={undefined}
              className={fileInput}
              id='fileInput'
              type='file'
              onChange={handleFileChange}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
