import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

export default function Select(props) {

    const { name, label, placeholder, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined" fullWidth {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                displayEmpty>
                <MenuItem value="" disabled>{placeholder} {label}</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}