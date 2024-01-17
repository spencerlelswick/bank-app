import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrl: './board-user.component.css',
})
export class BoardUserComponent implements OnInit {

  userData: any = {}



  constructor(private userService: UserService, private storageService: StorageService) {

  }

  ngOnInit(): void {
    this.loadUserData()
  }

  loadUserData() {
    let storedUser = this.storageService.getUser()
    this.userService.getUserData(storedUser.id).subscribe((data: any) => {
      this.userData = data
      console.log(this.userData);

    })
  }
}
