import { request } from "./generic.service";

const endpoints = {
  getUser: (id) => request({ url: `users/${id}`, method: "get" }),
  getUsers: () => request({ url: `users`, method: "get" }),
};

export default endpoints;
