import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

constructor() { }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  set(key: string, entity: any) {
    localStorage.setItem(key, JSON.stringify(entity));
  }

}