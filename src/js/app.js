import postsWithComments$ from "./api";
import Feed from "./components/feed/feed";

const container = document.querySelector('#root');

const feed = new Feed(container, postsWithComments$);