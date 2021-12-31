import { Controller, Get, Param, Res } from "@nestjs/common";
import { TransactionManager } from "typeorm";
import { Observable, of } from 'rxjs'
import { join } from "path";

@Controller('thumbnails')
export class ThumbnailsController{

    @Get('/:tnname')
    findThumbnailImage(@Param('tnname') tnName, @Res() res): Observable<Object> {
        console.log(join(process.cwd(), 'static/thumbnails/'+tnName))
        return of(res.sendFile(join(process.cwd(), 'src/static/thumbnails/'+tnName)))
    }

}