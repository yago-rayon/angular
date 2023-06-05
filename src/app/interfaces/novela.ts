export interface Novela{
    id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    autor: Object;
    listaCapitulos: Array<Object>;
  }