export interface Usuario{
    _id: string;
    nickname: string;
    email: string;
    fechaCreacion: Date;
    rol: string;
    novelasPublicadas: Array<Object>;
    novelasSeguidas: Array<Object>;
    estado: string;
    imagen: string;
  }