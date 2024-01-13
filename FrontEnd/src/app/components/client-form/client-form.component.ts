import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})

export class ClientFormComponent implements OnInit {
  isLoading = false;

  client = {
    name: '',
    email: '',
  };

  token: string = '';
  idToken: number = 0;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.apiService.generarToken()
      .subscribe({
        next: (response) => {
          this.token = response.data.token;
          this.idToken = response.data.id;
        },
        error: (error) => {
          console.error('Error al obtener el token', error);
        }
      })
  }

  onSubmit() {
    this.isLoading = true;
    this.apiService.validarToken(this.token)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response && response.data) {
            this.registrarCliente();
          } else {
            this.mostrarMensajeError('Respuesta no válida del servicio de validarToken');
          }
        },
        error: (error) => {
          console.log("errror");
          this.isLoading = false;
          this.mostrarMensajeError('Token incorrecto')
        }
      })
  }

  registrarCliente() {
    const queryObj =
    {
      ...this.client,
      IdToken: this.idToken
    }

    this.apiService.registrarCliente(queryObj)
      .subscribe({
        next: (response) => {
          console.log('Cliente registrado exitosamente', response);
          this.mostrarMensajeExitoso('Cliente registrado exitosamente');
        },
        error: (error) => {
          this.mostrarMensajeError('Error al registrar el cliente');
        }
      });
  }

  mostrarMensajeExitoso(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000
    });
  }

  mostrarMensajeError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000
    });
  }
}
