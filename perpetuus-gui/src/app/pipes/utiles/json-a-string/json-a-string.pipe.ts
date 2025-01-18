import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'json_stringify',
  standalone: true
})
export class JsonAStringPipe implements PipeTransform {

  transform(json: any, tabs?: number): unknown {
    console.log(tabs)
    console.log(JSON.stringify(json, undefined, tabs))
    return JSON.stringify(json, undefined, tabs);
  }

}
