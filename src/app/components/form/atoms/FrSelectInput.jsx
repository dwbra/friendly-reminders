import { useField } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const FrSelectInput = ({ data, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        className={props.className}
        id={props.id}
        select
        label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error ? <span className="error">{meta.error}</span> : null}
        {...field}
        {...props}
      >
        {data.length > 0
          ? data.map((item, index) => {
              return (
                <MenuItem key={`${index}/${item}`} value={item.toLowerCase()}>
                  {item}
                </MenuItem>
              );
            })
          : null}
      </TextField>
    </>
  );
};

export default FrSelectInput;
