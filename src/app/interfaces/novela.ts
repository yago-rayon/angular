export interface Novela{
    _id: string;
    autor: Object;
    titulo: string;
    descripcion: string;
    generos: Array<any>;
    etiquetas: Array<string>;
    fechaCreacion: Date;
    fechaUltimoCapitulo: Date;
    numeroCapitulos: number;
    listaCapitulos: Array<Object>;
    puntuacion: number;
    visitas: number;
    imagen: string;
  }