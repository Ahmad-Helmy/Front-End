import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import {
  delay,
  mergeMap,
  materialize,
  dematerialize,
  map
} from "rxjs/operators";

@Injectable()
export class MockServerService implements HttpInterceptor {
  users: any;

  constructor() {
    this.users = [
      {
        email: "ahmed@gmail.com",
        password: "12345678",
        name: "Ahmed Helmy",
        gender: "0",
        birthDate:
          "Wed Feb 01 1950 00:00:00 GMT+0200 (Eastern European Standard Time)"
      }
    ];
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let users = this.users;
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/user/login") && method === "POST":
          return login();
        case url.endsWith("/user") && method === "POST":
          return signup();
        case url.match(
          /\/user\/mailExist\/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        ) && method === "GET":
          return checkEmail();
        case url.match(/\/user\/S+$/) && method === "GET":
          return artist();

        
        // case url.endsWith("/artists/{id}") && method === 'GET':
        //     return artistInfo();
        //     case url.endsWith('/users') && method === 'GET':
        //         return getUsers();
        //     case url.match(/\/users\/\d+$/) && method === 'DELETE':
        //         return deleteUser();
        //     default:
        //         // pass through any requests not handled above
        // return next.handle(request);
      }
    }
    function login() {
      console.log("object");
      const { email, password } = body;
      let user = users.find(
        x => (x.email === email || x.name === email) && x.password === password
      );
      if (!user) return error("Incorrect username or password.");
      return ok({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWVkIEhlbG15IiwiaWF0IjoxNTE2MjM5MDIyfQ.1IywQey38ixVhRWY9cXsk8xzD7Z-aN9P-jQUsHwGhBE"
      });
    }

    function signup() {
      console.log(body);
      let { email, password, name, gender, birthDate } = body;
      switch (gender) {
        case 0:
          gender = "Mail";
          break;
        case 1:
          gender = "Femail";
          break;

        default:
          break;
      }
      if (email && password && name && gender && birthDate) {
        let user = users.find(x => x.email === email);
        if (user) return error("We're sorry, that email is taken.");
        user = {
          email,
          password,
          name,
          gender,
          birthDate
        };
        users.push(user);
        return ok({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWVkIEhlbG15IiwiaWF0IjoxNTE2MjM5MDIyfQ.1IywQey38ixVhRWY9cXsk8xzD7Z-aN9P-jQUsHwGhBE"
        });
      }
    }
    function checkEmail() {
      const urlSplit = url.split("/");
      const email = urlSplit[urlSplit.length - 1];
      const user = users.find(user => user.email === email);
      return user ? error("user Exist") : ok();
    }

    function artist(){
      if(!isLoggedIn()) return unauthorized()
      const artists=[{
        "followers" : [ {
          "total" : 5
        } ],
        "Images" : [ {
          "URL" : "https://cdn.ome.lt/9LBvp96wbthUZEMZqrzdnioAMYk=/fit-in/837x500/smart/uploads/conteudo/fotos/Adeleheader.jpg"
        }],
        "name" : "adele",
        "artistID" : "123"
        },
        {
          "followers" : [ {
            "total" : 10 
          } ],
          "Images" : [ {
            "URL" : "https://thevintagevines.files.wordpress.com/2015/01/bfxi4ifcmaa2vwq.jpg"
          }],
          "name" : "Ed Sheeran ",
          "artistID" : "154"
        }
      ]
      
      const id=idFromUrl()
      const artist= artists.find(al=>al.artistID===id)
      if (artist) return ok(artist)
      return error('no artist found with this id')
    }
    // helper functions

    function ok(body?) {
      console.log("successMock");
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function error(message) {
      console.log("errMock");
      return throwError({ error: { message } });
      // return throwError(new HttpResponse({ status: 400, body: message }));
    }

    function isLoggedIn() {
      return (
        headers.get("token") ===
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWVkIEhlbG15IiwiaWF0IjoxNTE2MjM5MDIyfQ.1IywQey38ixVhRWY9cXsk8xzD7Z-aN9P-jQUsHwGhBE"
      );
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 1];
    }
  }
}
export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockServerService,
  multi: true
};
