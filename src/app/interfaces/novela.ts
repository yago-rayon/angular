export interface Novela{
    _id: string;
    autor: Object;
    titulo: string;
    descripcion: string;
    generos: Array<string>;
    etiquetas: Array<string>;
    fechaCreacion: Date;
    fechaUltimoCapitulo: Date;
    numeroCapiutlos: number;
    listaCapitulos: Array<Object>;
    puntuacion: number;
    visitas: number;
    imagen: string;
  }