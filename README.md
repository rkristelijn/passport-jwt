
# Introduction
This is a test project to use Login/Logout/secure routes using JSON Web Token and passport. I'm not happy with the result; the test is lame and I get errors.

# Installation
1. clone repo
2. `npm i`
3. `npm start`
4. in a different shell: `npm test`

@see https://devdactic.com/restful-api-user-authentication-1/

I'm getting
```bash
GET /api/memberinfo 500 4.757 ms - 1954
TypeError: parsed_url.query.hasOwnProperty is not a function
    at JwtStrategy.authenticate (/home/pi/node-rest-auth/node_modules/passport-jwt/lib/strategy.js:108:50)
    at attempt (/home/pi/node-rest-auth/node_modules/passport/lib/middleware/authenticate.js:348:16)
    at authenticate (/home/pi/node-rest-auth/node_modules/passport/lib/middleware/authenticate.js:349:7)
    at Layer.handle [as handle_request] (/home/pi/node-rest-auth/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/pi/node-rest-auth/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/home/pi/node-rest-auth/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/home/pi/node-rest-auth/node_modules/express/lib/router/layer.js:95:5)
    at /home/pi/node-rest-auth/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (/home/pi/node-rest-auth/node_modules/express/lib/router/index.js:335:12)
    at next (/home/pi/node-rest-auth/node_modules/express/lib/router/index.js:275:10)
    at Function.handle (/home/pi/node-rest-auth/node_modules/express/lib/router/index.js:174:3)
    at router (/home/pi/node-rest-auth/node_modules/express/lib/router/index.js:47:12)
    at Layer.handle [as handle_request] (/home/pi/node-rest-auth/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/pi/node-rest-auth/node_modules/express/lib/router/index.js:317:13)
    at /home/pi/node-rest-auth/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/pi/node-rest-auth/node_modules/express/lib/router/index.js:335:12)

```
when I uncomment line 22-44 in test.js

It seems I'm not using it right, @see [https://jwt.io/](https://jwt.io/)