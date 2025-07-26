import { ajax } from 'rxjs/ajax';
import { of, catchError, interval, switchMap } from 'rxjs';

const API_URL = 'http://localhost:3003';

const stream$ = ajax.getJSON(`${API_URL}/posts/latest`).pipe(
    map(posts => console.log(posts)),
    catchError(error => {
        console.error(error);
        return of({ error: true, message: error.message });
    })
)

stream$.subscribe({
    next: data => console.log(data),
    error: err => console.error(err)
})

// const stream$ = interval(5000).pipe(
//     switchMap(() =>
//         ajax.getJSON(API_URL).pipe(
//             catchError(err => {
//                 console.error(err);
//                 return of({ error: true, message: err.message });
//             })
//         )
//     )
// )

// export default stream$;
