import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 /*  Variables  */
  nombre = '';
  arreglo = '';
  palabras: Array<string>;
  i = 0;
  nombreApikey = '&apikey=6c461a7c';
  pagina = 'http://www.omdbapi.com/?i=';
  peliculas: any = [];
  ocultar = true;
  info: any = [];

  /*  Creación de la url de la primera busqueda  */
  url = {
  pagina: 'http://www.omdbapi.com/?s=',
  peli: '',
  nombrePage: '&type=movie&page=',
  page: '1',
  nombreApiKey: this.nombreApikey
  };
/*  Creación de la url de la busqueda detallada */
  detallada = {
    pagina: this.pagina,
    peli: '',
    nombreApiKey: this.nombreApikey
  };

  constructor(private taskService: TaskService) {}


  /*  Metodo para completar la URL de la busqueda de las peliculas */
  completarUrl(){
    this.ocultar = true;
    this.palabras = this.url.peli.split(' ');

    for(this.i; this.i < this.palabras.length; this.i++){

      if(this.i !== 0){
        this.arreglo = this.arreglo + '+' + this.palabras[this.i];
      }
      else{
        this.arreglo = this.palabras[this.i];
      }
    }

    this.nombre = this.url.pagina + this.arreglo + this.url.nombrePage + this.url.page + this.url.nombreApiKey;

    this.i = 0;

    this.getAllTasks();
  }
  /*  Obtención del JSON  */
  getAllTasks(){
    this.taskService.getAllTasks(this.nombre)
    .subscribe(tasks => {
      this.peliculas = tasks;
        });
  }
  /*  Metodo para alternar el estado de ocultar */
  cambiarEstado(){
    this.ocultar = true;
  }
/*  Metodo para completar la URL de la busqueda de la descripcion de la pelicula */
  completarUrlDetalles(pelicula){
    this.ocultar = false;

    this.nombre = this.detallada.pagina + pelicula.imdbID + this.url.nombreApiKey;
    this.getAllInfo();
  }

  getAllInfo(){
    this.taskService.getAllTasks(this.nombre)
    .subscribe(tasks => {
      this.info = tasks;
        });
  }
}
