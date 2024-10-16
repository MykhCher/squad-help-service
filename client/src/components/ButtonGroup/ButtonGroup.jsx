import { Field } from 'formik';
import { useLayoutEffect } from 'react'

function ButtonGroup({ name, values: { domain }, ...rest }) {

  useLayoutEffect(() => {
    if (!domain) {
      rest.setFieldValue(name, 'allowMinorVariations');
    }
  })

  return (
    <div>
        <label id="domain-choice">Do you want a matching domain (.com URL) with your name?</label>
        <div>
            <label>
            <Field type="radio" name={name} value="allowMinorVariations"/>
            Yes (But minor variations are allowed)
            </label>
        </div>
        <div>
            <label>
            <Field type="radio" name={name} value="exactMatch" />
            Yes (The domain should exactly match the name)
            </label>
        </div>
        <div>
            <label>
            <Field type="radio" name={name} value="noDomain" />
            No (I am only looking for a name, not a domain)
            </label>
        </div>
    </div>
  )
}

export default ButtonGroup;