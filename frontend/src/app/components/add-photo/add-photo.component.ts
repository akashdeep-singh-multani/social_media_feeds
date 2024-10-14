import { CommonModule } from '@angular/common';
import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.css'
})
export class AddPhotoComponent {
  selectedImage: string | ArrayBuffer | null=null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() onPhotoSelection=new EventEmitter();

  constructor(){}

  handleAddPhotoClick(){
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event){
    const target=event.target as HTMLInputElement;
    if(target.files && target.files.length>0){
      const reader=new FileReader();
      reader.onload=(e)=>{
        const result=e.target?.result;
        if(result!==undefined){
          this.selectedImage=result;
          this.onPhotoSelection.emit(this.selectedImage);
        }
        else{
          this.selectedImage=null;
        }
      }
      reader.readAsDataURL(target.files[0])
    }
  }

}
