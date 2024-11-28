import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  noNumericOnly,
  noThreeConsecutiveLetters,
  percentage,
} from '../validators/validator';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  @Output() AddPhoto = new EventEmitter();
  @Output() closeCreateProduct = new EventEmitter();

  @Output() submitData = new EventEmitter();

  @Input() selectDataForm: any;

  closeCreate() {
    this.closeCreateProduct.emit(false);
  }

  @ViewChild('img') onFileSelectedInput!: ElementRef;

  @Input() isEditMode: any;

  selectedFile: any;

  submitted = false;

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      image: [null, Validators.required],
      title: [
        '',
        [Validators.required, noThreeConsecutiveLetters(), noNumericOnly()],
      ],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // تحقق من الأرقام فقط
      discount: [0, [Validators.required, percentage()]],
      catogery: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  onFileSelected(e: any) {
    const file = e.target.files[0];
    if (file) {
      // تحقق من نوع الملف
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        alert('الرجاء تحميل صورة بصيغة JPG أو PNG فقط.');
        this.onFileSelectedInput.nativeElement.value = ''; // إعادة تعيين القيمة إلى فارغة
        return;
      }

      // تحقق من حجم الملف
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 ميجابايت
      if (file.size > maxSizeInBytes) {
        alert('حجم الصورة يجب أن لا يتجاوز 2 ميجابايت.');
        this.onFileSelectedInput.nativeElement.value = ''; // إعادة تعيين القيمة إلى فارغة
        return;
      }

      // تحقق من الأبعاد
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (event: any) => {
        img.onload = () => {
          this.selectedFile = event.target?.result;
          this.productForm.patchValue({
            image: this.selectedFile,
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);


    }
  }


  ngOnInit() {
    if (this.selectDataForm) {
      this.productForm.patchValue({
        title: this.selectDataForm.title,
        price: this.selectDataForm.price,
        discount: this.selectDataForm.discount,
        catogery: this.selectDataForm.catogery,
        desc: this.selectDataForm.desc,
      });
      this.selectedFile = this.selectDataForm.image;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      if (!this.selectedFile) {
        console.log('No Data');
        return;
      }

      const productData = {
        title: this.productForm.get('title')?.value,
        price: this.productForm.get('price')?.value,
        discount: this.productForm.get('discount')?.value,
        catogery: this.productForm.get('catogery')?.value,
        desc: this.productForm.get('desc')?.value,
        image: this.selectedFile, // إرسال الصورة بتنسيق Base64
      };

      this.submitData.emit(productData);
      this.closeCreate();
    } else {
      console.log('برجاء املاء الحقول');
    }
  }
}
