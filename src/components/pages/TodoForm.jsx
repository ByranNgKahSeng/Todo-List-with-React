import React, { useEffect, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useForm, Form } from '../useForm';
import CKEditorComponent from '../CKEditorComponent';
import DueTimeComponent from '../DueTimeComponent';
import Controls from '../controls/Controls';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Button from '../controls/Button';

const initialFValues = {
    id: 0,
    title: '',
    description: '',
    start_time: dayjs(),
    duration: { value: 0, unit: 'Minutes' },
    due_time: null,
    status: 'Pending',
    priority: 'Medium',
    risk: 'Medium',
    effort: ''
};

const statusItems = [
    { id: 'Pending', title: 'Pending' },
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Completed', title: 'Completed' },
];

const priorityOptions = [
    { id: 'High', title: 'High' },
    { id: 'Medium', title: 'Medium' },
    { id: 'Low', title: 'Low' },
];

const riskOptions = [
    { id: 'High', title: 'High' },
    { id: 'Medium', title: 'Medium' },
    { id: 'Low', title: 'Low' },
];

export default function TodoForm({ recordForEdit, onFormSubmit }) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required.";
        if ('duration' in fieldValues)
            temp.duration = fieldValues.duration ? "" : "This field is required.";
        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("TodoForm submitted with values:", values);
        if (validate()) {
            onFormSubmit(values, resetForm);
        }
    };

    const handleDueTimeChange = (newDueTime) => {
      setValues(newDueTime);
    };

    const handleDescriptionChange = (data) => {
      setValues({ ...values, description: data });
    };

    //Testing
    const handleDisplayResult = () => {
      console.log("Final Input Result:", values);
    };

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
            });
    }, [recordForEdit, setValues]);



    return (
        <Form onSubmit={handleSubmit}>
            <Grid container columnSpacing={1}>
                <Grid container item xs={8} direction="column" rowSpacing={2} style={{ flexWrap: 'nowrap', alignItems: 'stretch', paddingRight:'20px' }}>
                    <Grid item>
                        <Typography variant='caption'>Title</Typography>
                        <TextField
                            name="title"
                            placeholder='Type your title here'
                            value={values.title}
                            onChange={handleInputChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                        />
                    </Grid>
                    <Grid item style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                        <Typography variant='caption'>Description</Typography>
                        <CKEditorComponent
                            description={values.description}
                            setDescription={handleDescriptionChange}
                            multiline={true}
                            maxRows={12}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                        />
                    </Grid>
                    <Grid item><Button onClick={handleDisplayResult}>Results</Button></Grid>
                </Grid>
                <Grid container item xs={4} direction="column" rowSpacing={0.5} style={{backgroundColor:'#F3F8FC', padding:'16px', borderRadius:'20px'}}>
                    <Grid item>
                        <Typography variant='h6'>Settings</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DueTimeComponent
                                value={values}
                                onChange={handleDueTimeChange}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>Status</Typography>
                        <Controls.Select
                            name="status"
                            placeholder="Choose the status"
                            value={values.status}
                            onChange={handleInputChange}
                            options={statusItems}
                            error={!!errors.status}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>Priority</Typography>
                        <Controls.ToggleButton
                            name="priority"
                            label="Priority"
                            value={values.priority}
                            onChange={handleInputChange}
                            items={priorityOptions}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>Risk</Typography>
                        <Controls.ToggleButton
                            name="risk"
                            label="Risk"
                            value={values.risk}
                            onChange={handleInputChange}
                            items={riskOptions}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>Effort</Typography> 
                        <TextField
                            name="effort"
                            placeholder="Add any resource"
                            value={values.effort}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            fullWidth
                            error={!!errors.effort}
                            helperText={errors.effort}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
}
