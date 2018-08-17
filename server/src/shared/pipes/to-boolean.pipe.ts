import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToBooleanPipe implements PipeTransform {
    transform(value: any, { type, metatype }: ArgumentMetadata) {
        if (type === 'query' && metatype === Boolean) {
            return value ? value === 'true' : null;
        }

        return value;
    }
}
