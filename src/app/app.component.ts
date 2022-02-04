import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reward, UserReward } from './models';
import { RewardService } from './services/rewards.service';
import { v4 as uuidv4 } from 'uuid';
import { UserRewardService } from './services/user-rewards.service';
import { UserBalanceService } from './services/user-balance.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	isWithdrawShown = false;

	constructor(
		public rewardService: RewardService,
		public userRewardService: UserRewardService,
		public userBalanceService: UserBalanceService,
	) {
		this.rewards = this.rewardService.getRewards();
		this.userRewards = this.userRewardService.getRewards();
		this.userBalance = this.userBalanceService.getBalance();
	}

	title = 'random-reward';
	rewards: Reward[] = []
	userRewards: UserReward[] = []
	userBalance: number = 0;

	displayedReward: Reward = null;
	isUIBlocked: boolean = false;

	nameControl: FormControl = new FormControl('', [Validators.required]);
	frequencyControl: FormControl = new FormControl(1, [Validators.min(0), Validators.required]);

	balanceToWithDraw: FormControl = new FormControl(null, [Validators.min(0), Validators.required]);

	addRewardForm = new FormGroup({
		name: this.nameControl,
		frequency: this.frequencyControl,
	});

	withDrawBalanceForm = new FormGroup({
		balanceToWithDraw: this.balanceToWithDraw,
	});

	public nameChange($event: any) {
		console.log('', $event);
	}

	public addReward() {
		const reward: Reward = {
			id: uuidv4(),
			name: this.nameControl.value,
			frequency: Number(this.frequencyControl.value)
		}
		this.rewards = this.rewardService.addReward(reward);
	}

	public trackById(index: number, el: Reward) {
		return el.id;
	}

	public withdrawBalance() {
		const value = this.balanceToWithDraw.value;
		console.log('withdrawBalance', value);
		this.addToBalance(-value);
		this.isWithdrawShown = false;
	}

	public removeReward(reward: Reward) {
		this.rewards = this.rewardService.deleteReward(reward.id)
	}

	public addToBalance(value?: number) {
		if(!value) {
			this.userBalance = this.userBalanceService.addToBalance(this.pickNumericRewards());
		} else {
			this.userBalance = this.userBalanceService.addToBalance(value);
		}
	}

	public useUserReward(reward: UserReward) {
		this.userRewards = this.userRewardService.deleteReward(reward.id)
	}

	public pickReward() {
		this.displayedReward = this.rewardService.getRandomReward(this.rewards);
		this.userRewards = this.userRewardService.addReward(this.displayedReward);
		this.blockUiFor(500);
	}

	public punish() {
		let rewardToPunish = this.rewardService.getRandomReward(this.rewards);
		const hasReward = this.userRewards.some((r) => r.id === rewardToPunish.id)
		if(hasReward) {
			this.useUserReward(rewardToPunish as UserReward)
		} else {
			while(typeof Number(rewardToPunish.name) !== 'number') {
				rewardToPunish = this.rewardService.getRandomReward(this.rewards);
			}
			const balanceToPunish = -Number(rewardToPunish.name);
			console.log('balanceToPunish', balanceToPunish);
			this.addToBalance(balanceToPunish)
		}
		this.displayedReward = rewardToPunish;
		this.blockUiFor(1000);
	}

	public pickNumericRewards() {
		const rewards = [...this.userRewards];
		const total = rewards.reduce((acc: number, cur: UserReward) => {
			const balance = Number(Number(cur.name) * cur.amount);
			if (balance != null && balance) {
				for (let index = 0; index < cur.amount; index++) {
					this.useUserReward(cur);
				}
				acc += balance;
			}
			return acc;
		}, 0)


		return total;
	}

	public getTotal(): number {
		const total = this.userRewards.reduce((acc: number, cur: UserReward) => {
			const balance = Number(Number(cur.name) * cur.amount);
			if (balance != null && balance) {
				acc += balance;
			}
			return acc;
		}, 0)

		return total;
	}

	public blockUiFor(number: number) {
		this.isUIBlocked = true;
		setTimeout(() => {
			this.isUIBlocked = false;
			this.displayedReward = null;
		}, number)
	}
}
