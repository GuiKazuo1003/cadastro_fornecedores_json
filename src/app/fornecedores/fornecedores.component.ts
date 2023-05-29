import { Component, OnInit } from '@angular/core';
import { Supplier } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {
     
     fornecedores: Supplier[] = []
     formGroupFornecedor: FormGroup;
     isEditing: boolean = false;

     constructor (private fornecedorService: FornecedorService, formBuilder: FormBuilder){
      this.formGroupFornecedor = formBuilder.group(
        {
          id : [''],
          name : [''],
          active : false ,
          category : [''],
          contact : ['']
        }
      )
     }

     ngOnInit(): void {
       this.loadFornecedor();
     }

     loadFornecedor() {
      this.fornecedorService.getFornecedor().subscribe({
        next: data => {
          this.fornecedores = data;
          console.log('Fornecedores:', this.fornecedores);
        },
        error: msg => console.log('Erro ao chamar o endpoint:', msg)
      });
    }    

     save() {
      if (this.isEditing) {
        this.fornecedorService.uptade(this.formGroupFornecedor.value).subscribe(
          {
            next : () => {
              this.loadFornecedor();
              this.formGroupFornecedor.reset();
              this.isEditing = false;
            }
          }
        )
      }
      else 
      this.fornecedorService.save(this.formGroupFornecedor.value).subscribe(
        {
          next : data => {
            this.fornecedores.push(data);
            this.formGroupFornecedor.reset();
          }
        }
      )
     }

     edit(fornecedores: Supplier): void {
      this.formGroupFornecedor.setValue(fornecedores);
      this.isEditing = true;
  }
  remove(fornecedores: Supplier): void{

    this.fornecedorService.remove(fornecedores).subscribe({
    
    next:() => this.loadFornecedor()
    
    });
    
    }
}
