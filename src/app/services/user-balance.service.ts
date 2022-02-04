import { Reward, UserReward } from './../models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorage } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserBalanceService {
  public readonly USER_BALANCE_KEY = 'userBalance';
  constructor(private ls: LocalStorage) {}

  getBalance() {
    return this.ls.get(this.USER_BALANCE_KEY) || 0;
  }

  setBalance(value: number) {
    this.ls.set(this.USER_BALANCE_KEY, value);
  }

  addToBalance(amount: number) {
    const oldBalance: number = this.ls.get(this.USER_BALANCE_KEY);
    const newBalance = Number(oldBalance) + Number(amount);

    this.ls.set(this.USER_BALANCE_KEY, newBalance);
    return newBalance;
  }
}
