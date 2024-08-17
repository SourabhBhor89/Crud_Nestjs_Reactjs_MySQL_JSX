// import { Controller, Get , Post, HttpCode, Header} from '@nestjs/common';

// @Controller('cats')
// export class CatsController {
 
 
//     /*
//         @Redirect('https://nest.js.com', 301)   (pehle url then status code, but status code imp nhi h vh default 302 rhega )
//         @Header('Cache-Control','none')// to send a custom response 
//         @HttpCode(204)// to send status code

//     */



//     @Post()
//     @Header('Cache-Control','none')// to send a custom response 
//     @HttpCode(204)// to send status code
//     create(): string {
//       return 'This action adds a new cat';
//     }
 
 
//     @Get()
//   findAll(): string {
//     return 'This action returns all cats';
//   }
// }
















// @Post()
// @Roles(Role.Admin)
// create(@Body() createCatDto: CreateCatDto) {
//   this.catsService.create(createCatDto);
// }