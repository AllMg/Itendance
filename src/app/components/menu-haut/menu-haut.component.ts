import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu-haut',
  templateUrl: './menu-haut.component.html',
  styleUrls: ['./menu-haut.component.css']
})
export class MenuHautComponent implements OnInit {
  isAuth : boolean;
  message_connex : String;
  constructor(
    public authService:AuthService,
    private router:Router
  ) {

  }

  ngOnInit() {
    this.authService.loadToken();
    var id_acces = localStorage.getItem("id_acces");
    if(id_acces==undefined)
    {
      this.isAuth = false;
      this.message_connex = "Se connecter";
    }
    else
    {
      this.isAuth = true;
      this.message_connex = "Se déconnecter";
    }
  }
  onLogoutEven(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
