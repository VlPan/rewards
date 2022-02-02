import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zl',
  pure: true
})
export class ZlPipe implements PipeTransform {

  transform(value: any, post = 'zl'): any {
    if(Number(value)) {
      return value + post;
    }
    return value;
  }

}
