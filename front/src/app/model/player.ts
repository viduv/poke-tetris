export interface Player {
	id: string;
	name: string;
	isOwner: boolean;
  lockLine: number;
  spectrum: Array<number>;
  hasLose: boolean;
}
