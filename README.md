# :zap: Angular Fast Http Caching

* Uses HTTP Angular (asynchronous) Observables with RxJS (JS version of Reactive library) and browser local storage to show a locally cached version of API data.
* Replaced by real data once the network request has completed.

*** Note: to open web links in a new window use: _ctrl+click on link_**

## :page_facing_up: Table of contents

* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## :books: General info

* "Observables are a new way of pushing data in JavaScript. An observable is a Producer of multiple values, “pushing” them to subscribers."
* Shows all github repos using a search term 'angular'.

## :camera: Screenshots

![Example screenshot](./img/fast-http-caching.png).

## :signal_strength: Technologies

* [Angular v11](https://angular.io/)
* [Angular CLI v11](https://cli.angular.io/)
* [RxJS Library v6](https://angular.io/guide/rx-library) used to handle datastreams and propagation of change using observables.
* [RxJS startWith operator](http://reactivex.io/documentation/operators/startwith.html) used to emit a specified sequence of values before beginning to emit the items from the source Observable.
* [The HttpClient in @angular/common/http](https://angular.io/guide/http) offers a simplified client HTTP API for Angular applications that rests on the XMLHttpRequest interface exposed by browsers.

## :floppy_disk: Setup

* Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* Run `ng lint` to lint check code - quotemarks check changed to false in `tslint.json` - passes linting.

## :computer: Code Examples

* `app.component.ts` _subscribe to github repo and use http caching_

```typescript
export class AppComponent {
  repos;

  constructor(http: HttpClient) {
    const path = 'https://api.github.com/search/repositories?q=angular';
    this.repos = http.get<any>(path)
      .pipe(
        map(data => data.items)
      );

    this.repos.subscribe(next => {
      localStorage[CACHE_KEY] = JSON.stringify(next);
    });

    this.repos = this.repos.pipe(
      startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
    )

  }
}

```

## :cool: Features

* An Angular HTTP Observable is combined with RxJS and the browser's local storage to automatically serve up a locally cached version that gets replaced by the real data as soon as the network request is finished.
* Updated to latest Angular 11 & all dependencies up to date.

## :clipboard: Status & To-Do List

* Status: Working.
* To-Do: nothing.

## :clap: Inspiration

* [Youtube tutorial by 'Demos with Angular', Fast HTTP Caching With Angular HTTP Observables](https://www.youtube.com/watch?v=Yf1FfhMetjs&t=535s).
* [Luuk Gruijs, Medium article, "Understanding, creating and subscribing to observables in Angular"](https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3)

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
