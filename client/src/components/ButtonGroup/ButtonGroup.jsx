import { Field } from 'formik';
import { useLayoutEffect } from 'react'
// =====
import styles from './ButtonGroup.module.sass';

const radioStyle = {position: 'absolute', opacity: 0, pointerEvents: null};
const headerStyle = (value, field) => ({color: field === value ? 'inherit' : '#0009'});
const borderStyle = (value, field) => ({borderColor: field === value ? 'blue' : '#ccc'});

function ButtonGroup({ name, values: { domain }, ...rest }) {

  useLayoutEffect(() => {
    if (!domain) {
      rest.setFieldValue(name, 'allowMinorVariations');
    }
  })

  return (
    <div className={styles.fieldContainer}>
      <label id="domain-choice" className={styles.domainChoice}>Do you want a matching domain (.com URL) with your name?</label>
      <div className={styles.optionContainer}>
          <div>
              <label className={styles.option}style={borderStyle("allowMinorVariations", domain)}>
              <Field type="radio" name={name} value="allowMinorVariations" style={radioStyle}/>
              <span className={styles.header} style={headerStyle("allowMinorVariations", domain)}>Yes</span> <span className={styles.description}>But minor variations are allowed</span>
              </label>
          </div>
          <div>
              <label className={styles.option}style={borderStyle("exactMatch", domain)}>
              <Field type="radio" name={name} value="exactMatch" style={radioStyle} />
              <span className={styles.header} style={headerStyle("exactMatch", domain)}>Yes</span> <span className={styles.description}>The domain should exactly match the name</span>
              </label>
          </div>
          <div>
              <label className={styles.option}style={borderStyle("noDomain", domain)}>
              <Field type="radio" name={name} value="noDomain" style={radioStyle}/>
              <span className={styles.header} style={headerStyle("noDomain", domain)}>No</span> <span className={styles.description}>I am only looking for a name, not a domain</span>
              </label>
          </div>
      </div>
    </div>
  )
}

export default ButtonGroup;