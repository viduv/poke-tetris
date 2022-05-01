export interface Player {
	id: string;
	name: string;
	isOwner: boolean;
  lockline: number;
  spectrum: Array<number>;
  hasLose: boolean;
}
