import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IGithubUser} from "../model/igithub-user.model";
import {GITHUB_URL} from "../../utils/constants/url-constants";

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    constructor(private http: HttpClient) {
    }

    fetchGithubUser(username: string): Observable<IGithubUser> {
        return this.http.get<IGithubUser>(`${GITHUB_URL}/${username}`);
    }

}
