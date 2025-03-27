import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GithubUser} from "../model/github-user.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    constructor(private http: HttpClient) {
    }

    fetchGithubUser(url: string): Observable<GithubUser> {
        return this.http.get<GithubUser>(url);
    }

}
