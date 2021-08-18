import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
    heroesUrl: string;
    textfile: string;
    date: any;
  }
  @Injectable({
    providedIn: 'root'
  })
export class ConfigService {
    config: Config | undefined;
    
  constructor(private http: HttpClient) { }

  configUrl = 'https://vendingappthemba.herokuapp.com/vend/getAllProducts';

getConfig() {
  return this.http.get<Config>(this.configUrl);
}

}