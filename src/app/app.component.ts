import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, startWith } from "rxjs/operators";

const CACHE_KEY = "httpRepoCache";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "angular-fast-http-caching";
  repos: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRepos();
  }

  getRepos() {
    const path = "https://api.github.com/search/repositories?q=angular";
    this.repos = this.http.get<any>(path).pipe(map((data: any) => data.items));

    this.repos.subscribe((next: any) => {
      console.log("next data: ", next, typeof next); // type=object
      localStorage[CACHE_KEY] = JSON.stringify(next); // store in local storage
    });

    this.repos = this.repos.pipe(
      startWith(JSON.parse(localStorage[CACHE_KEY] || "[]"))
    );
  }
}
