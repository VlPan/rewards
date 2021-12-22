export interface Reward {
  id?: string;
  name: string;
  frequency: number;
}

export interface UserReward extends Reward {
	amount: number;
}