import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  roomConference: any;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {}

  manageRooms(){
    window.location.href="http://localhost:3030";
  }

}
