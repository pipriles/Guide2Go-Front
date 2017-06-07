import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import { HttpUtils } from '../providers/custom-http';


@Injectable()
export class UserProvider {

	userUrl: string;

	constructor(
		public http: Http, 
		public authHttp: AuthHttp, 
		public JwtHelper: JwtHelper,
		private httputils: HttpUtils) {

		this.userUrl = this.httputils.routes['user'];
	}

	createUser(args: {}): Observable<{}> {

		let bodyString = JSON.stringify(args);
		let options = this.httputils.authHeaders();;

		return this.http.post(this.userUrl, bodyString, options)
		.map(this.printInside)
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));

	}

	private printInside(res: Response) {
		let body = res.json();
		console.log(body);
		return body;
	}

	show(token, user){
		
		// Aqui hay q ver como se manda el token solo
		// this.userUrl + '/' + this.JwtHelper.decodeToken(token).sub+'?token=' + token
		
		// Ya deberia funcionar sin el token de parametro

		let url = `${this.userUrl}${this.httputils.tokenSub(token)}`;
		let opt = this.httputils.authHeaders();

		return this.authHttp.get(url,opt)
			.subscribe(
				data => { 
					user.nombre  = data.json().users.pop().name; 
					user.email   = data.json().users.pop().email; 
					user.dolares = data.json().users.pop().dolares
				},
				err => console.log(err),
				() => console.log('Request Complete')
			);
	}

}
