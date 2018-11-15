import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { IndividuService } from '../services/individu/individu.service';
import { IjService } from '../services/ij/ij.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class FemininGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private indivService: IndividuService,
        private ijService: IjService
    ) { }

    canActivate(): boolean {
        // if (this.authService.loggedIn()) {
        //     const user = JSON.parse(localStorage.getItem('user'));
        //     this.indivService.infoIndiv(user.id_acces).subscribe(data => {
        //         if (data.success) {
        //             const user = data.msg;
        //             if (user.id_sexe.id_sexe !== "M") {
        //                 this.ijService.controleIj(user.id_acces).subscribe(data => {
        //                     if (!data.success) {
        //                         this.router.navigate(['/accueil-connecte']);
        //                         return false;
        //                     }
        //                 });
        //             }
        //             else {
        //                 this.router.navigate(['/accueil-connecte']);
        //                 return false;
        //             }
        //         }
        //         else {
        //             this.router.navigate(['/accueil-connecte']);
        //             return false;
        //         }
        //     });
        //     return true;
        // } else {
        //     this.router.navigate(['/']);
        //     return false;
        // }
        return true;
    }
}
