import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

 // Ajusta la ruta según la ubicación real de tu servicio

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  users: any[] = [];
  searchTerm: string = '';
  originalUsers: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
     this.apiService.getUsers().subscribe((data) => {
      this.users = data.data; // Ajusta la estructura según la respuesta real de la API
      this.originalUsers = [...this.users]; // Guarda una copia de la lista original
    });
  }
  
  
  
  search() {
    if (!this.searchTerm) {
      // Si el campo de búsqueda está vacío, muestra todos los usuarios originales.
      this.users = [...this.originalUsers];
      return;
    }

    // Filtra los usuarios en función del término de búsqueda
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    this.users = this.originalUsers.filter((user) => {
      // Puedes ajustar las propiedades en las que deseas buscar aquí
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return fullName.includes(searchTermLowerCase) || user.email.toLowerCase().includes(searchTermLowerCase);
    });
  }

  clearSearch() {
    // Muestra todos los usuarios originales al borrar el campo de búsqueda
    this.users = [...this.originalUsers];
    this.searchTerm = '';
  }
  
  
}



