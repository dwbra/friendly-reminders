import { useField } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FrSelectInput = ({ data, label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <FormControl fullWidth>
        <InputLabel className={props.className} id={props.id}>
          {label}
        </InputLabel>
        <Select labelId={props.id} value={field.value} id={props.id} label={label} {...field} {...props}>
          {data.length > 0
            ? data.map((item, index) => {
                return (
                  <MenuItem key={`${index}/${item}`} value={item}>
                    {item}
                  </MenuItem>
                );
              })
            : null}
        </Select>
      </FormControl>
    </>
  );
};

export default FrSelectInput;
