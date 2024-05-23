import React,{ useEffect } from 'react';
import { Typography, Box, Grid, TextField, Select, MenuItem, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: '#e0e0e0',
  overflow: 'hidden',
  marginLeft:'50px',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0),
    padding:'3px 15px',
    border: 0,
    
    '&:not(:first-of-type)': {
      borderRadius: '8px',
    },
    '&:first-of-type': {
      borderRadius: '8px',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: 0,
  borderRadius: '8px',
  fontSize: '0.6rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '.MuiToggleButton-root':{
    backgroundColor:'black',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginRight:'-15px',
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const DueTimeComponent = ({ value, onChange }) => {
  const [dueTimeType, setDueTimeType] = React.useState('exact');

  const handleToggleChange = (event, newDueTimeType) => {
    if (newDueTimeType !== null) {
      setDueTimeType(newDueTimeType);
    }
  };

  const handleStartTimeChange = (newStartTime) => {
    onChange({
        ...value,
        start_time: dayjs(newStartTime)
    });
  };

  const handleDurationChange = (event) => {
    onChange({
        ...value,
        duration: { ...value.duration, value: event.target.value }
    });
  };

  const handleUnitChange = (event) => {
    onChange({
        ...value,
        duration: { ...value.duration, unit: event.target.value }
    });
  };

  useEffect(() => {
    // Calculate due time based on start time and duration
    if (value.start_time && value.duration.value && value.duration.unit) {
        const calculatedDueTime = dayjs(value.start_time)
            .add(value.duration.value, value.duration.unit.toLowerCase())
            .toDate();
        onChange({
            ...value,
            due_time: calculatedDueTime
        });
        console.log("Due Time:", calculatedDueTime); // Log the calculated due time to console
    }
}, [value.start_time, value.duration,]);

  return (
    <Box sx={{ padding: '0px', borderRadius: '8px', backgroundColor: '', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="caption">Due Time</Typography>
        <StyledToggleButtonGroup
          value={dueTimeType}
          exclusive
          onChange={handleToggleChange}
          aria-label="due time type"
        >
          <StyledToggleButton value="exact" aria-label="exact">
            Exact
          </StyledToggleButton>
          <StyledToggleButton value="duration" aria-label="duration">
            Duration
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      {dueTimeType === 'exact' ? (
        <DateTimePicker
          label="Pick a Start Date and Time"
          value={value.start_time}
          onChange={handleStartTimeChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      ) : (
        <Grid container  alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Duration"
              type="number"
              value={value.duration.value || ''}
              onChange={handleDurationChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StyledSelect
                      value={value.duration.unit || 'Minutes'}
                      onChange={handleUnitChange}
                    >
                      <MenuItem value="Minutes">Minutes</MenuItem>
                      <MenuItem value="Hours">Hours</MenuItem>
                    </StyledSelect>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DueTimeComponent;