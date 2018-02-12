
import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../../../environments/environment";
import * as _ from 'lodash'

@Injectable()

export class InterceptedHttp extends Http {

    timeoutid;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    goToLoginPageTimeout(timeInMinutes) {  //If there's no network activity during a period of time, we go back to the login page
        this.timeoutid = setTimeout(() => {
            window.location.href = environment.angularjs + '/login'
        }, timeInMinutes * 60 * 1000);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        clearTimeout(this.timeoutid);
        this.goToLoginPageTimeout(60);
        return observable.catch((err, source) => {
            if (err.status == 401 && !_.endsWith(err.url, 'user/auth')) {
                localStorage.setItem("user", "");
                window.location.href=environment.angularjs +'/login'
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }

    private updateUrl(req: string) {
        return environment.nodejs + '/' + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        var userRights = JSON.parse(localStorage.getItem('user')) || {};

        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        options.headers.delete("Authorization");
        options.headers.delete("Content-Type");
        options.headers.append("Authorization", userRights.token);
        options.headers.append('Content-Type', 'application/json');

        return options;

    }



}