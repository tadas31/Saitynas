import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterExtService {

  private previousPreviousUrl: String = undefined;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;


  constructor(private router : Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousPreviousUrl = this.previousUrl;
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl(){
    return this.previousUrl;
  }

  public getPreviousPreviousUrl(){
    return this.previousPreviousUrl;
  }
}
