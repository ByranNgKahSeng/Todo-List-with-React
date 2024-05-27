import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, Typography, DialogActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Controls from "./controls/Controls";
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'relative',
        top: theme.spacing(3),
        minWidth:'80%',
        margin:'0 auto',
        borderRadius: theme.shape.borderRadius,
          
    },
    dialogTitle:{
        
    }
}))

export default function Popup(props) {

    const { title, subtitle, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} classes={{ paper: classes.dialogWrapper }} >
            <DialogTitle classes={{paper:classes.dialogTitle}} >
                <div style={{ display:'flex', justifyContent: 'space-between'}}>
                    <div style={{  }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ flexGrow: 1 }}>
                            {subtitle}
                        </Typography> 
                    </div>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            
            <DialogContent dividers >
                {children}
            </DialogContent>

            <DialogActions color="secondary" sx={{pt:'15px'}}>
                <Button 
                    onClick={() => setOpenPopup(false)} 
                    sx={{
                        width:'200px', 
                        border: '1px solid blue',
                        borderRadius: '20px',
                        padding: '12px 24px', 
                    }}>
                    Cancel
                </Button>
                <Button 
                    type="submit"
                    form="TodoForm"
                    sx={{
                        width:'200px', 
                        border: '1px solid blue',
                        borderRadius: '20px',
                        padding: '12px 24px', 
                    }}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}