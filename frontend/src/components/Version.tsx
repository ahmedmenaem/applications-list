import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateSharpIcon from '@material-ui/icons/FileCopyRounded';
import VersionModel from '../models/version.model';

interface Props {
	version: VersionModel;
	handleDeleteButtonClick: any;
	handleDownloadButtonClick: any;
}

const Version = ({ version, handleDownloadButtonClick }: Props) => (
	<ListItem>
		<ListItemAvatar>
			<Avatar>
				<FolderIcon />
			</Avatar>
		</ListItemAvatar>
		<ListItemText primary={version.id} />
		<ListItemSecondaryAction>
			<IconButton aria-label="Delete" onClick={() => {}}>
				<DeleteIcon />
			</IconButton>
			<IconButton
				aria-label="Download"
				onClick={() => {
					handleDownloadButtonClick(version.id);
				}}
			>
				<UpdateSharpIcon />
			</IconButton>
		</ListItemSecondaryAction>
	</ListItem>
);

export default Version;
