import { Reward, UserReward } from './../models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorage } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserRewardService {
  public readonly USER_REWARDS_KEY = 'userRewards';
  constructor(private ls: LocalStorage) {}

  getRewards() {
    return this.ls.get(this.USER_REWARDS_KEY) || [];
  }

  addReward(reward: Reward) {
    const oldRewards: UserReward[] = this.ls.get(this.USER_REWARDS_KEY);
    const isRewardExist = oldRewards.some((r) => reward.id === r.id);
    let newRewards = oldRewards;
    if (isRewardExist) {
      const index = oldRewards.findIndex((r) => r.id === reward.id);
      const r: UserReward = oldRewards[index];
      r.amount += 1;
	  newRewards[index] = r;
    } else {
      const userReward: UserReward = {
        id: reward.id,
        frequency: reward.frequency,
        name: reward.name,
        amount: 1,
      };
      newRewards = [userReward, ...oldRewards];
    }

    this.ls.set(this.USER_REWARDS_KEY, newRewards);
    return newRewards;
  }

  deleteReward(id: string) {
    const oldRewards: UserReward[] = this.ls.get(this.USER_REWARDS_KEY);
    const index = oldRewards.findIndex((r) => r.id === id);
    const rewardToRemove: UserReward = oldRewards[index];
    let newRewards = oldRewards;
    if (rewardToRemove.amount > 1) {
      rewardToRemove.amount -= 1;
      oldRewards[index] = rewardToRemove;
    } else {
      newRewards = oldRewards.filter((a) => a.id !== id);
    }
    this.ls.set(this.USER_REWARDS_KEY, newRewards);
    return newRewards;
  }

  updateReward(reward: UserReward) {
    let oldRewards = this.ls.get(this.USER_REWARDS_KEY);
    const rewardToUpdate = oldRewards.find((a) => a.id === reward.id);
    const newReward = Object.assign(rewardToUpdate, reward);
    oldRewards = oldRewards.filter((a) => a.id !== reward.id);
    const newRewards = [newReward, ...oldRewards];
    this.ls.set(this.USER_REWARDS_KEY, newRewards);
  }
}
