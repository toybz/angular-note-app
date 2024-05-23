import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true,
})
export class TruncateTextPipe implements PipeTransform {
  public transform(value: string, [limit]: [number]): unknown {
    if (value.length <= limit) {
      return value;
    } else {
      return value.slice(0, limit) + '...';
    }
  }
}
