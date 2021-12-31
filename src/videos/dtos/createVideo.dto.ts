import { IsEmail, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateVideoDto {

     @IsString()
     @IsNotEmpty()
     title: string;


    
    @IsString()
    @IsNotEmpty()
    description: string;
    

 
  thumbnail: string;
  

  userId: number;
  videoId: number;


}
