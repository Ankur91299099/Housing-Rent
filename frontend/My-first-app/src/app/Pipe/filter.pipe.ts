import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any {

    const resultArray = [];
    // for(let sww of value)
    // {
    //   console.log(sww);
    //   console.log("This is inside value")
    //   console.log(value.length)
    // }
    if (value){
     // console.log(value+" Ankur");
    if (value.length === 0 || filterString === '' || propName === '') {
     // console.log(value+" manu");
      return value;
    }
    //console.log(value+" result array")
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}

}
