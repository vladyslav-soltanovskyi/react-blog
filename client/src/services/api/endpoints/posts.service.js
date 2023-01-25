import { request } from './generic.service';

const endpoints = {
  getPost: (id) => request({ url: `posts/${id}`, method: 'get' }),
  getPosts: (searchParams = window.location.search) => request({ url: `posts${searchParams}`, method: 'get' }),
  createPost: (data) => request({ url: `posts`, method: 'post', data }), // data: {title, text, photoUrl, description}    
  editPost: (id, data) => request({ url: `posts/${id}`, method: 'patch', data }), // data: {title, text, photoUrl, description}
  deletePost: (id) => request({ url: `posts/${id}`, method: 'delete' }),
}

export default endpoints