import './feed.css'

export default class Feed {
    constructor(container, stream$) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('This is not HTML element!');
        }
        this.container = container;
        this.stream$ = stream$;

        this.getData();
    }

    //Получение данных с постами и комментариями
    getData() {
        this.stream$.subscribe(data => {
            data.forEach(post => {
                this.renderPost(post);
            })
        })
    }

    //Отрисовка поста
    renderPost(post) {
        const postBlock = document.createElement('div');
        postBlock.classList.add('post-block');

        const postAuthor = document.createElement('div');
        postAuthor.classList.add('post-author');

        const authorAvatar = document.createElement('div');
        authorAvatar.classList.add('author-avatar');

        const authorInfo = document.createElement('div');
        authorInfo.classList.add('author-info');

        const authorFullName = document.createElement('p');
        authorFullName.classList.add('author-full-name');
        authorFullName.textContent = post.author;

        const postDate = document.createElement('p');
        postDate.classList.add('post-date');
        postDate.textContent = new Date(post.created * 1000).toLocaleString();

        authorInfo.append(authorFullName, postDate);

        postAuthor.append(authorAvatar, authorInfo);

        const postMainInformation = document.createElement('div');
        postMainInformation.classList.add('post-main-information');

        const comments = this.renderComments(post.comments.data);

        postBlock.append(postAuthor, postMainInformation, comments);

        this.container.appendChild(postBlock);
    }

    //Отрисовка комментариев
    renderComments(comments) {
        const commentsBlock = document.createElement('div');
        commentsBlock.classList.add('comments-block');

        const commentsTitle = document.createElement('span');
        commentsTitle.classList.add('comments-title');
        commentsTitle.textContent = 'Latest comments';

        const commentsWrapper = document.createElement('div');
        commentsWrapper.classList.add('comments-wrapper');

        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.classList.add('comment-block');

            const commentAvatar = document.createElement('div');
            commentAvatar.classList.add('comment-avatar');

            const commentMainInfo = document.createElement('div');
            commentMainInfo.classList.add('comment-main-info');

            const commentAuthorName = document.createElement('p');
            commentAuthorName.classList.add('comment-author-name');
            commentAuthorName.textContent = comment.author;

            const commentText = document.createElement('p');
            commentText.classList.add('comment-text');
            commentText.textContent = comment.content;

            commentMainInfo.append(commentAuthorName, commentText);

            const commentDate = document.createElement('div');
            commentDate.classList.add('comment-date');
            commentDate.textContent = new Date(comment.created * 1000).toLocaleString();

            commentBlock.append(commentAvatar, commentMainInfo, commentDate);

            commentsWrapper.append(commentBlock);
        })


        const commentsBtn = document.createElement('button');
        commentsBtn.classList.add('comments-btn');
        commentsBtn.textContent = 'Load More';

        commentsBlock.append(commentsTitle, commentsWrapper, commentsBtn);

        return commentsBlock;

    }
}