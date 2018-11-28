import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AgentGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router, private toastr: ToastrService) {

  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      const user =  JSON.parse(localStorage.getItem('user'));
      const  entity = user.type_entite;
      if (entity !== 'E' && entity !== 'T' && entity !== 'C') {
        return true;
      }
      this.router.navigate(['/']);
      setTimeout( () => {
        this.toastr.error('Vous n\'êtes pas un agent CNaPS ', 'Accès Refusé');
      });
      return false;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
