import { Field } from 'formik';
import { useLayoutEffect } from 'react'
import classNames from 'classnames';
// =====
import styles from './ButtonGroup.module.sass';

function ButtonGroup({ name, values: { domain }, ...rest }) {

  useLayoutEffect(() => {
    if (!domain) {
      rest.setFieldValue(name, 'allowMinorVariations');
    }
  })

  return (
    <div className={styles.fieldContainer}>
      <p className={styles.domainChoice}>Do you want a matching domain (.com URL) with your name?</p>
      <div className={styles.optionContainer}>
          <div>
              <label 
                className={classNames(styles.option, {[styles.clicked]: domain==='allowMinorVariations'})}
              >
                <p className={styles.recommended}>Recommended</p>
                <Field type="radio" name={name} value="allowMinorVariations" className={styles.radioBtn} />
                <span className={styles.header}>Yes</span> 
                <span className={styles.description}>But minor variations are allowed</span>
              </label>
          </div>
          <div>
              <label 
                className={classNames(styles.option, {[styles.clicked]: domain==='exactMatch'})}
              >
                <Field type="radio" name={name} value="exactMatch" className={styles.radioBtn} />
                <span className={styles.header}>Yes</span> 
                <span className={styles.description}>The domain should exactly match the name</span>
              </label>
          </div>
          <div>
              <label 
                className={classNames(styles.option, {[styles.clicked]: domain==='noDomain'})}
              >
                <Field type="radio" name={name} value="noDomain" className={styles.radioBtn} />
                <span className={styles.header}>No</span> 
                <span className={styles.description}>I am only looking for a {rest.initialValues.contestType}, not a domain</span>
              </label>
          </div>
      </div>
    </div>
  )
}

export default ButtonGroup;