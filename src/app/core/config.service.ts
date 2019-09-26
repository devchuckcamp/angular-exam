import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public apiPort='';
  public host='27e9bee7.ngrok.io'; //main api domain
  public protocol='http://'; //protocol
  public googleLogin=this.protocol+this.host+':'+this.apiPort+'/glogin';

  constructor(
  ) {

  }

  apiEndPoint(){
      return this.protocol+this.host+':'+this.apiPort;
  }

}
