import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/token")
  getToken(@Req() req: Request, @Res() res: Response) {
    const token =  this.appService.getToken(req.body);
    console.log(token)
    res.status(HttpStatus.OK).json({token})
  }

  @Get("/token/dadosmock")
  getTokenMock(@Res() res: Response) {
    const token =  this.appService.getToken({
        cpfCPNJ: "999999990000103",
        dadosUsuario:{
            cnpj: "999999990000103",
            nomeFantasia: "Chat Gestor"
        }
    });
    console.log(token)
    return res.status(HttpStatus.OK).json({token})
  }
}
