import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from './fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  url = "http://localhost:3000/fornecedores";

  constructor(private http: HttpClient) { }

  getFornecedor(): Observable<Supplier[]> {

    return this.http.get<Supplier[]>(this.url);
  }
  save(fornecedores: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, fornecedores);
  }
  remove(fornecedores : Supplier):Observable<void>{
    return this.http.delete<void>(`${this.url}/${fornecedores.id}`);
  }
  uptade(fornecedores : Supplier):Observable<Supplier> {
    return this.http.put<Supplier>(`${this.url}/${fornecedores.id}`, fornecedores);
  }
}
