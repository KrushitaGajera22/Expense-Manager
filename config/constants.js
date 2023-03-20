const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
let uuid = require('uuid')

module.exports.constants = {
    jwt_secret: '!@3secret#$',
    pass: 'jfpp cgjy rwie xbkj',
    userName: 'krushitagajera22@gmail.com',
    jwt: jwt,
    bcrypt: bcrypt,
    nodemailer: nodemailer,
    uuid: uuid
};