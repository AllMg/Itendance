import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class DocteurGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router, private toastr: ToastrService) {

  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      const user =  JSON.parse(localStorage.getItem('user'));
      const  entity = user.type_entite;
      if (entity === 'S') {
        return true;
      }
      this.router.navigate(['/']);
      setTimeout( () => {
        this.toastr.error('Vous n\'êtes pas dans le service SEM ', 'Accès Refusé');
      });
      return false;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
