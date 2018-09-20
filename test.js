const http = require('http');
const assert = require('assert');
const uuidv1 = require('uuid/v1');
//var querystring = require('querystring');
let user1 = uuidv1();
let token1 = 'empty';

describe('api', () => {
    it('should be running and return "Hello! The API is at http://localhost:8080/api"', (done) => {
        http.get('http://localhost:8080', (res) => {
            let body = '';
            let statusCode = res.statusCode;
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                assert(200 === statusCode);
                assert('Hello! The API is at http://localhost:8080/api' === body);
                done();
            });
        });
    });

    it('should be not work', (done) => {
        let getOptions = {
            host: 'localhost',
            port: 8080,
            path: '/api/memberinfo',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };
        let request = http.request(getOptions, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let res = JSON.parse(body);
                console.log(res);
                assert(res.success === true);
                //assert(res.msg === `Welcome in the member area ${user1}!`);
            });
        });
        request.end();
    });

    it(`should accept signup of ${user1}`, (done) => {
        let postJSON = {
            name: user1,
            password: user1
        };
        let postString = JSON.stringify(postJSON);
        let postOptions = {
            host: 'localhost',
            port: 8080,
            path: '/api/signup',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Content-Length': postString.length
            }
        };
        let postRequest = http.request(postOptions, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let res = JSON.parse(body);
                assert(res.success === true);
                assert(res.msg === 'Successful created new user.')
                //console.log(res);
                done();
            })
        });
        postRequest.end(postString);
    });

    it(`should log in with ${user1}`, (done) => {
        let postJSON = {
            name: user1,
            password: user1
        };
        let postString = JSON.stringify(postJSON);
        let postOptions = {
            host: 'localhost',
            port: 8080,
            path: '/api/authenticate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Content-Length': postString.length
            }
        };
        let postRequest = http.request(postOptions, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let res = JSON.parse(body);
                assert(res.success === true);
                token1 = res.token;
                let getOptions = {
                    host: 'localhost',
                    port: 8080,
                    path: '/api/memberinfo',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': token1
                    }
                };
                let request = http.request(getOptions, (res) => {
                    let body = '';
                    res.setEncoding('utf8');
                    res.on('data', chunk => body += chunk);
                    res.on('end', () => {
                        let res = JSON.parse(body);
                        //console.log(res);
                        assert(res.success === true);
                        assert(res.msg === `Welcome in the member area ${user1}!`);

                        //logout
                        getOptions = {
                            host: 'localhost',
                            port: 8080,
                            path: '/api/logout',
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                                'Authorization': token1
                            }
                        };

                        request = http.request(getOptions, (res) => {
                            let body = '';
                            res.setEncoding('utf8');
                            res.on('data', chunk => body += chunk);
                            res.on('end', () => {
                                let res = JSON.parse(body);
                                console.log(res);
                                assert(res.success === true);
                                assert(res.msg === 'Logged out!');
                                done();
                            })
                        });
                        request.end();
                    });
                });
                request.end();


                //done();
                //});
            });
        });
        postRequest.end(postString);
    });

    // it(`should accept secure site with token ${token1}`, (done) => {
    //     let getOptions = {
    //         host: 'localhost',
    //         port: 8080,
    //         path: '/api/memberinfo',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //             'Authorization': token1
    //         }
    //     };
    //     let request = http.request(getOptions, (res) => {
    //         let body = '';
    //         res.setEncoding('utf8');
    //         res.on('data', chunk => body += chunk);
    //         res.on('end', () => {
    //             let res = JSON.parse(body);
    //             assert(res.success === true);
    //             assert(res.msg === 'Welcome in the member area ${user1}!')
    //             done();
    //         })
    //     });
    //     request.end();
    // });
})