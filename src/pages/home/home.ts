import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { Refresher,reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ordenar:boolean = false;
  audio:any;
  animales:Animal[] = [];
  tiempo_audio:any;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0); // permite editar un arreglo 
    this.audio = new Audio;
  }
  reproducir( animal:Animal ){
    console.log(animal);
    
    if ( animal.reproduciendo ){
      this.audio.pause();
      clearTimeout( this.tiempo_audio );
      //this.audio.currentTime = 0; este sirve para colocar el tiempo en 0
      animal.reproduciendo = false;
    }

    
    else{
      this.audio.src = animal.audio;

      this.audio.load();
      this.audio.play();
    
      animal.reproduciendo = true;

      this.tiempo_audio = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000 );
    }
    
    
  }
  delete(index:number){
    this.animales.splice(index,1);//borra la posicion deignada dentro de un arreglo
  }
  reboot( refresher:Refresher ){
    setTimeout( ()=>{
      console.log('termino el refresher');
      refresher.complete();
      this.animales = ANIMALES.slice(0);
    },1500)

  }
  reordenar(order:any){
    console.log(order);
    //para la siguiente funcion primero va el nombre del arreglo
    // que se va a reordenar despues la reorganizacion
    this.animales = reorderArray (this.animales,order);
  }

}
