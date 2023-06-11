import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaHastaAhora'
})
export class FechaHastaAhoraPipe implements PipeTransform {

  transform(valor: any, argumentos?: any): any {
    if (valor) {
      const segundos = Math.floor((+new Date() - +new Date(valor)) / 1000);
      if (segundos < 29) // Menos de 30 segundos lo mostrará como 'Ahora mismo'
        return 'Ahora mismo';
      const intervalos = {
        'año': 31536000,
        'mes': 2592000,
        'semana': 604800,
        'día': 86400,
        'hora': 3600,
        'minuto': 60,
        'segundo': 1
      };
      let contador;
      for (const i in intervalos) {
        contador = Math.floor(segundos / intervalos[i]);
        if (contador > 0)
          if (contador === 1) {
            return 'Hace ' + contador + ' ' + i; // singular (Hace 1 día)
          } else {
            if (i == 'mes') {
              return 'Hace ' + contador + ' ' + i + 'es'; //plurar para meses
            } else {
              return 'Hace ' + contador + ' ' + i + 's'; // plural (Hace 2 días)
            }
          }
      }
    }
    return valor;
  }

}
