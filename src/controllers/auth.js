const express = require("express");
const router = express.Router();
const request = require('request');
const querystring = require('querystring');
const { LoginToken } = require('../models/index')

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    await request({
        uri: 'https://github.com/login/oauth/access_token',
        qs: {
            client_id: "9691758a27d2e065a849",
            client_secret: "27e7df8a740bec6094b1e2bb4f06b6145c7f2488",
            code
        }
    }, async (error, response, body) => {
        const { access_token } = querystring.parse(body);
        req.session.access_token = access_token;
        const loginToken = await LoginToken.create({ name: access_token });
        res.redirect('http://localhost:4000?token=' + access_token);
        // await request({
        //     uri: 'https://api.github.com/user',
        //     headers: {
        //         'Authorization': `token ${access_token}`,
        //         'User-Agent': 'Mozilla/5.0'
        //     }
        // }, async (error, response, body) => {
        //     const data = querystring.parse(body);
        //     res.json(data);
        // })
    });
});

router.get('/token', async (req, res) => {
    const token = await LoginToken.findOne({where: {
        name: req.headers.token
    }})
    if (token) {
        req.session.access_token = req.headers.token;
        res.json(token);
    } else {
        res.json({ token: false });
    }
});

module.exports = router;