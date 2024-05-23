// src/components/controls/ToggleButton.js
import React from 'react';
import { ToggleButton as MuiToggleButton , ToggleButtonGroup } from '@mui/material';

export default function ToggleButton(props) {
  const { name, label, value, onChange, items } = props;

  const handleToggleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange({
        target: {
          name: name,
          value: newValue,
        },
      });
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleToggleChange}
      aria-label={label}
      fullWidth
    >
      {items.map((item) => (
        <MuiToggleButton key={item.id} value={item.id} aria-label={item.title}>
          {item.title}
        </MuiToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
