import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as RSA from 'node-rsa';
import * as fs from 'fs';
import { IDadosLogin } from './interface/IDadosLogin';
import { IRequestToken } from './interface/IRequestToken';

@Injectable()
export class AppService {
  
  getToken(request : IRequestToken):string {
    try{
      const publicIBMKey = fs.readFileSync('./src/keys/public_ibm.pem');
      const privateKey = fs.readFileSync("./src/keys/private.pem");
      const rsaKey = new RSA(publicIBMKey);
      if(!request.cpfCPNJ) throw new Error('É necessário informar o CNPJ ou CPF');
      const payload : IDadosLogin = {
        sub: request.cpfCPNJ, // Required
        iss: 'www.exemplo.com' // Required
      };
      if (request.dadosUsuario) {
        payload.user_payload = rsaKey.encrypt(request.dadosUsuario, 'base64'); 
      } 
      const token = jwt.sign(payload, privateKey , { algorithm: 'RS256', expiresIn: '30s' }); 
      return token;
    }catch(e){
      throw new Error(e);
    }
  }
}


