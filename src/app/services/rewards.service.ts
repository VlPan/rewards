import { Reward } from './../models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorage } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

public readonly REWARDS_KEY = 'rewards2';
constructor(private ls: LocalStorage) {}

  getRewards() {
    return this.ls.get(this.REWARDS_KEY) || [];
  }

  addReward(reward: Reward) {
    const oldRewards = this.ls.get(this.REWARDS_KEY);
    const newRewards = [reward, ...oldRewards];
    this.ls.set(this.REWARDS_KEY, newRewards);
	return newRewards;
  }

  deleteReward(id: string) {
    const oldRewards = this.ls.get(this.REWARDS_KEY);
    const newRewards = oldRewards.filter(a => a.id !== id);
    this.ls.set(this.REWARDS_KEY, newRewards);
	return newRewards;
  }

  updateReward(reward: Reward) {
    let oldRewards = this.ls.get(this.REWARDS_KEY);
    const rewardToUpdate = oldRewards.find(a => a.id === reward.id);
    const newReward = Object.assign(rewardToUpdate, reward);
    oldRewards = oldRewards.filter(a => a.id !== reward.id);
    const newRewards = [newReward, ...oldRewards];
    this.ls.set(this.REWARDS_KEY, newRewards);
  }

  pryoritizeRewards(rewards: Reward[]): Reward[] {
    return rewards.reduce((acc, cur) => {
      for (let i = 0; i < cur.frequency; i++) {
        acc.push(cur);
      }
      return acc;
    }, []);
  }

  getRandomReward(rewards: Reward[]) {
	rewards = this.pryoritizeRewards(rewards)
	console.log('rewards', rewards);
    const min = 0;
    const max = rewards.length;
    const rand = Math.floor(Math.random() * max) + min;

    return rewards[rand];
  }
}