import { ajax } from 'rxjs/ajax';
import { of, catchError, map, mergeMap, toArray, from } from 'rxjs';

const API_URL = 'http://localhost:3003';

const postsWithComments$ = ajax.getJSON(`${API_URL}/posts/latest`).pipe(
    map(response => response.data),
    mergeMap(posts => from(posts)),
    mergeMap(post =>
        ajax.getJSON(`${API_URL}/posts/${post.id}/comments/latest`).pipe(
            map(comments => ({
                ...post,
                comments,
            })),
            catchError(() => of({ ...post, comments: [] }))
        )
    ),
    toArray(),
    catchError(error => {
        console.error('Ошибка загрузки:', error);
        return of([]);
    })
)

export default postsWithComments$

postsWithComments$.subscribe(posts => {
    console.log(posts);
})

