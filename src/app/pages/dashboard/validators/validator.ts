import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// تحقق مخصص يسمح فقط بالأرقام
export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = /^[0-9],{2}$/.test(control.value);
    return isValid ? null : { invalidNumber: { value: control.value } };
  };
}

export function percentage(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && !value.endsWith('%')) {
      return { invalidpercent: { value: control.value } };
    }
    return null;
  };
}




export function noThreeConsecutiveLetters(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // التحقق إذا كانت القيمة موجودة وإذا كان هناك 3 حروف متشابهة متتالية
    const value = control.value;

    // التعبير المنتظم للتحقق من 3 حروف متشابهة متتالية
    const regex = /([a-zA-z])\1\1$/;

    // إذا وجدنا 3 حروف متشابهة متتالية نعيد خطأ
    if (value && regex.test(value)) {
      return { noThreeConsecutiveLetters: { value: control.value } };
    }

    return null; // القيمة صالحة
  };
}




// تحقق مخصص يمنع القيم الرقمية فقط
export function noNumericOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // إذا كانت القيمة تحتوي على أرقام فقط
    if (/^\d+$/.test(value)) {
      return { numericOnly: { value: control.value } }; // إرجاع خطأ إذا كانت القيم رقمية فقط
    }

    return null; // إذا كانت القيمة تحتوي على نصوص أو مزيج من الحروف والأرقام
  }
}