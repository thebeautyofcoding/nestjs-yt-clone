import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    ClassSerializerInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
  


interface ClassConstructor{
    new(...args: any[]): {}
}
  
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) {
        
    }

    intercept(context: ExecutionContext, hadnler: CallHandler): Observable<any>{
        return hadnler.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues:true
                })
            })
        )
    }
}