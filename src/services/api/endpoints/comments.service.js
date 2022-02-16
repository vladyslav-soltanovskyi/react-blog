import { request } from './generic.service';

const endpoints = {
  getCommentsByPost: (id) => request({ url: `comments/post/${id}`, method: 'get' }),
  getComments: (searchParams = window.location.search) => request({ url: `comments${searchParams}`, method: 'get' }),
  createComment: (data) => request({ url: `comments`, method: 'post', data }), // data: {postId, text}
  editComment: (id, text) => request({ url: `comments/${id}`, method: 'patch', data: { text } }),
  deleteComment: (id) => request({ url: `comments/${id}`, method: 'delete' }),
}

export default endpoints;