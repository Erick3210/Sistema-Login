import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


export @Component({
    
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})


 
  
  class RegistrarUsuarioComponent implements OnInit{
  registrarUsuario: FormGroup;
  loading: boolean = false;
  
    constructor(
    
            private formBuilder: FormBuilder,
            private afAuth: AngularFireAuth,
            private toastr: ToastrService,
            private router: Router
         
             ) {
    this.registrarUsuario = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      repetirPassword: ['',[Validators.required]],
    });
  }
 
  
  ngOnInit():void{
      
      
  }
  
  
  registrar(){
      
      const email = this.registrarUsuario.value.email;
      const password = this.registrarUsuario.value.password;
      const repetirPassword = this.registrarUsuario.value.repetirPassword;
      
      console.log(this.registrarUsuario);
      
      
      if (password !== repetirPassword) {
       this.toastr.error("Syntax Error","Invalid Password or Email");
      return;
    }
      
     
      this.loading = true;
      this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
         
         this.loading = false;
         this.toastr.success("Succefully register", "New user registered");
         this.router.navigate(['/login']);
          
      }).catch((error) =>{
      
        this.loading = false;
        console.log(error);
        this.toastr.error( this.firebaseError(error.code) )
      
      });
        
  }
  
  
  firebaseError(code: string){
      
      switch(code){
          case 'auth/email-already-in-use':
          return 'El usuario ya existe';
          
          case 'auth/weak-password':
          return 'La contraseña es muy debil';
          
          case 'auth/invalid-email':
          return 'Correo invalido';
          
          default:
          return 'Error desconocido';
      }
  }
  
  
  
  
  
  
}
