import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reward, UserReward } from './models';
import { RewardService } from './services/rewards.service';
import { v4 as uuidv4 } from 'uuid';
import { UserRewardService } from './services/user-rewards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(
		public rewardService: RewardService,
		public userRewardService: UserRewardService
	) {
		this.rewards = this.rewardService.getRewards();
		this.userRewards = this.userRewardService.getRewards();
	}

	title = 'random-reward';
	rewards: Reward[] = []
	userRewards: UserReward[] = []

	pickedReward: Reward = null;

	nameControl: FormControl = new FormControl('', [Validators.required]);
	frequencyControl: FormControl = new FormControl(1, [Validators.min(0), Validators.required]);

	addRewardForm = new FormGroup({
		name: this.nameControl,
		frequency: this.frequencyControl,
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

	public removeReward(reward: Reward) {
		this.rewards = this.rewardService.deleteReward(reward.id)
	}

	public userUserReward(reward: UserReward) {
		this.userRewards = this.userRewardService.deleteReward(reward.id)
	}

	public pickReward() {
		this.pickedReward = this.rewardService.getRandomReward(this.rewards);
		this.userRewards = this.userRewardService.addReward(this.pickedReward);
	}
}
