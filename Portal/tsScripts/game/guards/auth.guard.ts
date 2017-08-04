import { AuthService } from '../shared/services/auth.service';
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from '@angular/router';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}