import { request } from "./generic.service";

const endpoints = {
  login: (data) => request({ url: `auth/login`, method: "post", data }), // data: { email, password }
  register: (data) => request({ url: `auth/register`, method: "post", data }), // { fullName, email, password }
  authMe: () => request({ url: `auth/me`, method: "get" }),
};

export default endpoints;
