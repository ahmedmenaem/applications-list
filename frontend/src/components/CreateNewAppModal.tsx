import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ModalProps {
	open: boolean;
	toggleModal: any;
	handleSaveButtonClick: any;
}

interface ModalState {
	error: boolean;
	name: string;
}

class NewAppModal extends Component<ModalProps, ModalState> {
	public state = {
		error: false,
		name: ''
	};

	public handleSaveButtonClick = (event: React.SyntheticEvent) => {
		const { name } = this.state;
		if (name !== '' && name !== undefined && name !== null) {
			this.props.handleSaveButtonClick(name);
			this.props.toggleModal();
		} else {
			this.setState(({ error }) => ({
				error: !error
			}));
		}
	};

	public handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ name: event.target.value });
	};

	public render() {
		return (
			<Fragment>
				<Dialog open={this.props.open} onClose={this.props.toggleModal} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">New Application</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To add new application, please enter applicatoin name here.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="application-name"
							label="Application Name"
							type="text"
							fullWidth
							required
							error={this.state.error}
							onChange={this.handleTextFieldChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.toggleModal} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSaveButtonClick} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

export default NewAppModal;
