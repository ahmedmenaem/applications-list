import axios from 'axios';
import App from '../models/app.model';
import Version from '../models/app.model';

export default {
	list: async (): Promise<Array<App>> => {
		const uri = `/api/apps`;
		const response: any = await axios.get(uri);
		return response.data;
	},

	findOneById: async (id: string): Promise<App> => {
		const uri = `/api/apps/${id}`;
		const response: any = await axios.get(uri);
		return response.data;
	},

	create: async (id: string, name: string): Promise<App> => {
		const uri = `/api/apps/${id}`;
		const body = {
			name
		};
		const response: any = await axios.post(uri, body);
		return response.data;
	},

	delete: async (id: string) => {
		const uri = `/api/apps/${id}`;
		const response: any = await axios.delete(uri);
		return response.data;
	},

	createVersion: async (appId: string, versionId: string): Promise<Version> => {
		const uri = `/api/apps/${appId}/${versionId}`;
		const response: any = await axios.post(uri, {});
		return response.data;
	},

	getVersionById: async (appId: string, versionId: string) => {
		const uri = `/api/apps/${appId}/${versionId}`;
		const response: any = await axios.get(uri);
		return response.data;
	},

	uploadVersionFile: async (appId: string, versionId: string, file: any) => {
		try {
			let formData = new FormData();
			formData.append('file', file);
			const uri = `/api/apps/${appId}/${versionId}/file`;
			const config = { headers: { 'Content-Type': 'multipart/form-data' } };
			const response: any = await axios.post(uri, formData, config);
			return response.data;
		} catch (ex) {

		}
	},

	downloadVersionFile: async (file: string) => {
		try {
			const response: any = await axios.get(file, { responseType: 'blob'});
			return response.data;
		} catch (ex) {

		}
		
	}
};
