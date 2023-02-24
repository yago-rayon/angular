//Utilidades
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styleUrls: ['./crear-autor.component.scss']
})
export class CrearAutorComponent {
  form: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      nombre: [''],
      foto: [null],
    });
  }

  ngOnInit() {}
  subirFichero(event:any) {
    if((event.target as HTMLInputElement).files != null) 
    {
      const fichero = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      foto: fichero,
    });
    this.form.get('foto')!.updateValueAndValidity();
    }
    
  }
  enviarFormulario() {
    let formData: any = new FormData();
    formData.append('nombre', this.form.get('nombre')!.value);
    formData.append('foto', this.form.get('foto')!.value);
    this.http
      .post('http://localhost:8001/api/autor/nuevo', formData)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }
}
