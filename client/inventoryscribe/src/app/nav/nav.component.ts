import { Component, OnInit } from '@angular/core';
import {JwtService} from '../services/jwt.service';
import {Router, ActivatedRoute} from '@angular/router'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router,private snackBar: MatSnackBar, private jwtservice: JwtService) { }

  ngOnInit() {
  }

  logout(){
    this.jwtservice.clearJwtToken();
    this.snackBar.open('Logged out', null, {duration: 2000});
    this.router.navigate(['login']);

  }
}
