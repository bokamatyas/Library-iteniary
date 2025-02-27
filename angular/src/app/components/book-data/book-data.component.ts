import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../../models/book-model';
import { blobToURL, fromBlob } from 'image-resize-compress';


@Component({
  selector: 'app-book-data',
  standalone: true,
  imports: [],
  templateUrl: './book-data.component.html',
  styleUrl: './book-data.component.css'
})
export class BookDataComponent {
  @Input() bookData: BookModel | undefined = undefined;
  @Output() saved = new EventEmitter<BookModel>();

  cancel() {
    this.bookData = undefined;
  }

  save() {
    this.saved.emit(this.bookData);
  }

  getData(_input: any): string{
    return _input.target.value;
  }

  getNumberData(_input: any): number {
    return +_input.target.value;
  }

  getCollectionData(_input: any) {
    return _input.target.value.split('\n');
  }

  async addAttachment(_input: any) {
    if(_input.target.files[0].size / 1024 > 200){
      alert("File must be smaller or exactly 200kB!");
      (document.querySelector('#image') as HTMLInputElement).value = '';
      this.bookData!.image = '';
      return;
    }
    const resizedImage = await fromBlob(_input.target.files[0], 8, 200, 200, 'webp')  
    this.bookData!.image = await blobToURL(resizedImage);
  }

}
