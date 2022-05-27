# Installation

Before starting the server, you need to install all the dependencies.

To do this, run the `yarn` command.

# Configuration

1. When the installation of dependencies is completed, you need to create a `.env` file by inserting into this new file all the contents from the `.env.example` file.
2. Now you need to register on the website https://mongodb.com and copy the link to your MongoDB database.
3. Inside the `.env` file there is a string `MONGODB_URI=XXX`, instead of `XXX` insert a link to your database.

# Starting

In order to start the server itself, run the `yarn start` command. Now at the address `http://localhost:5656 ` the server will be available.

All available routers are listed below.

# API documentation (Apiary)

At https://blogapi22.docs.apiary.io/ all documentation on all routes is available with a detailed explanation of what each router does and how.

Keep in mind that in order to create an article or comment, you need to be authorized. After authorization, the backend will return a `token` in response to you. It must be passed to all protected laptops inside headers in the `Authorization` property.

Here is an example of a request:
```js
axios.post(
  `http://localhost:5656/posts`,
  {
    title: "Article title",
    text: "........",
  },
  {
    headers: {
      "Authorization": "ТУТ_ТОКЕН"
    }
  }
);
```

## How to use Apiariy?

1. If you want to test requests through the Apiary service, then you need to switch to "Use Browser" there so that requests are not sent through their service. If not changed, it will always give an error.
![](http://joxi.ru/L21a3a5cwMkjq2.png ) <br/> <br/>
2. To send a request, just click on "Call Resource"
![](http://joxi.ru/zANLQLMt197o0m.png)
3. If it is necessary to pass POST parameters in the request, then click on "Body" and specify JSON with parameters there.
![](http://joxi.ru/BA0ZaZQC1Dxbxm.png)

## Apiary is complicated, is there anything simpler?
Yes, you can download Postman (https://www.postman.com/) and send requests through it.

Or you can write Axios queries and test them yourself in your application (but this option is not the easiest).
