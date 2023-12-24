import React from 'react';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';
import styles from '../../../page.module.scss';

const FrTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        className={styles.frFormTextInput}
        id={props.id}
        name={props.name}
        label={label}
        value={field.value}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        {...field}
        {...props}
      />
    </>
  );
};

export default FrTextInput;
