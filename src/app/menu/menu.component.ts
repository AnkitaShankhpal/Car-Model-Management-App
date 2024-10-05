import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  userRole!: string | null;

  ngOnInit(): void {
      localStorage.setItem('userRole', 'Admin'); 

      this.userRole = localStorage.getItem('userRole');
  }
}