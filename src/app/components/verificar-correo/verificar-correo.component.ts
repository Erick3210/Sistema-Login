import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Comment } from './comment';




@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {
    [x: string]: any;

  texto: string = "";
  imagenSeleccionada: string = "";
  
  newUsername: string = '';
  comments: Comment[] = [];
  selectedImage: any = null; // Variable para almacenar la imagen seleccionada




constructor() {}

  ngOnInit(): void {
      
    // Cargar datos almacenados al cargar la página
    const storedTexto = localStorage.getItem('texto');
    if (storedTexto) {
      this.texto = storedTexto;
    }

    const storedImagen = localStorage.getItem('imagenSeleccionada');
    if (storedImagen) {
      this.imagenSeleccionada = storedImagen;
    }
      
      
      
      
    // Puedes cargar comentarios iniciales desde tu backend aquí si es necesario.
    
    const savedImage = localStorage.getItem('selectedImage');
    if (savedImage) {
      this.selectedImage = savedImage;
    }
    
    
    for (let i = 0; i < localStorage.length; i++) {
     const key1 = localStorage.key(i);
     if (key1 && key1.startsWith('comment_')) { // Verifica que key no sea null antes de usar startsWith
     const comment = JSON.parse(localStorage.getItem(key1) || '');
     this.comments.push(comment);
   }
  }
 
    
  }

    //addComment(username: string, content: string): void {
      // const newComment = new Comment(username, content);

      // Genera un identificador único para el comentario
      // const commentId = Date.now().toString(); // Puedes utilizar una lógica más avanzada para generar IDs únicos

      // Almacena el comentario en localStorage
     //  localStorage.setItem(`comment_${commentId}`, JSON.stringify(newComment));

      // Agrega el comentario a la matriz
      // this.comments.push(newComment);

      // Limpia los campos de entrada
       //this.newUsername = '';
      // this.newComment = '';
   //  }
   
   
   
   addComment( content: string): void {
     const newComment = new Comment(content, this.imagenSeleccionada);

     // Genera un identificador único para el comentario
     const commentId = Date.now().toString(); // Puedes utilizar una lógica más avanzada para generar IDs únicos

     // Almacena el comentario en localStorage
     localStorage.setItem(`comment_${commentId}`, JSON.stringify(newComment));

     // Agrega el comentario a la matriz
     this.comments.push(newComment);

     // Limpia los campos de entrada
     this.newUsername = '';
     this.imagenSeleccionada = ''; // Limpia la URL de la imagen seleccionada
   }
    
    
    
    deleteComment(index: number): void {
  if (index >= 0 && index < this.comments.length) {
    // Elimina el comentario de la matriz
    this.comments.splice(index, 1);

    // Elimina el comentario de localStorage si existe
    const commentId = `comment_${index}`;
    localStorage.removeItem(commentId);
  }
}

    
    
  
  
  
    // Método para manejar la selección de archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImage = reader.result;
        localStorage.setItem('selectedImage', this.selectedImage);
      };
    }
 
  }
  
  
  
  
    // Método para manejar la carga de la imagen
  onImageUpload(): void {
    // Aquí puedes agregar la lógica para cargar la imagen al servidor si es necesario
    // Por ahora, solo mostramos la imagen seleccionada en la pantalla
  }
  
  
  
  clearLocalStorage(): void {
  localStorage.clear();
}



 

cargarImagen(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagenSeleccionada = e.target.result;
      
      // Almacena la imagen en localStorage después de cargarla
      localStorage.setItem('imagenSeleccionada', this.imagenSeleccionada);
    };
    reader.readAsDataURL(file);
  }
}

  imprimir() {
    // Puedes personalizar cómo deseas mostrar el texto y la imagen en pantalla
    console.log("Texto:", this.texto);
    console.log("Imagen:", this.imagenSeleccionada);
    
     localStorage.setItem('texto', this.texto);
  }
 

}