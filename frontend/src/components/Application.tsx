import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import App from '../models/app.model';

interface Props {
	app: App;
	handleDeleteButtonClick: any;
	handleApplicationClick: any;
}

class Application extends Component<Props> {
	public handleDeleteButtonClick = (event: React.SyntheticEvent) => {
		event.stopPropagation();
		this.props.handleDeleteButtonClick(this.props.app.id);
	};
	public handleApplicationClick = () => this.props.handleApplicationClick(this.props.app.id);
	public render() {
		return (
			<ListItem onClick={this.handleApplicationClick}>
				<ListItemAvatar>
					<Avatar>
						<FolderIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary={this.props.app.name} />
				<ListItemSecondaryAction>
					<IconButton aria-label="Delete" onClick={this.handleDeleteButtonClick}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	}
}

export default Application;
