import Version from './version.model';

export default interface App {
	name?: string;
	id?: string;
	versions?: Array<Version>;
};
