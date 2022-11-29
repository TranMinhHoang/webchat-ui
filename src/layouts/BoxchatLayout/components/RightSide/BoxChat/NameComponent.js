import React, {Component} from 'react';
import { Button, DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Dialog} from '@mui/material';

class NameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            name: null
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    save = () => {
        this.setState({open: false});
        this.props.setName(this.state.name);
    };

    setEnteredName = (event) => {
        this.setState({name: event.target.value});
    };

    render() {
        return (
            <div>
                <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Chat</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your name
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="name" onChange={this.setEnteredName}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.save} color="primary">
                            Save
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default NameComponent;
