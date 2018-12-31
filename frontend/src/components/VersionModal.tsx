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
	version: string;
}

class VersionModal extends Component<ModalProps, ModalState> {
	public state = {
		error: false,
		version: ''
	};

	public handleSaveButtonClick = (event: React.SyntheticEvent) => {
		const { version } = this.state;
		if (version !== '' && version !== undefined && version !== null) {
			this.props.handleSaveButtonClick(version);
			this.props.toggleModal();
		} else {
			this.setState(({ error }) => ({
				error: !error
			}));
		}
	};

	public handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ version: event.target.value });
	};

	public render() {
		return (
			<Fragment>
				<Dialog open={this.props.open} onClose={this.props.toggleModal} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Add Version</DialogTitle>
					<DialogContent>
						<DialogContentText>Please enter your version.</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="application-version"
							label="Application Version"
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

export default VersionModal;
