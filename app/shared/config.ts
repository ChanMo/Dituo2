import { Injectable } from '@angular/core';
import { getString, setString } from 'application-settings';

const token = '';

export class Config {
  static apiUrl = 'http://dituo.chirongkeji.com/api/';

  static isLoggedIn(): boolean {
    return !!getString('token');
  }

  static get token(): string {
    return getString('token');
  }

  static set token(theToken: string) {
    setString('token', theToken);
  }
}
