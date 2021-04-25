import {Request} from '@/config/request'
import config from '@/config/config';
import axios from 'axios';

export function getCourse(data = {}) {
    // return Request('/course', { methods: 'GET', data });
}

export function getLIST(data = {}) {
    return Request('/LIST', {methods: 'POST', data});
}

export async function getAllExistingCourse(data = {}, callback) {
    // this function will get all existing courses from database
    const result = await Request('/course', {methods: 'GET', data});
    callback(result);
    return Promise.resolve()
}

export async function getOldCourse(data = {}, callback) {
    // this function will get all existing courses from database
    const result = await Request('/courseold', {methods: 'GET', data});
    callback(result);
}

export async function getUserInfo(data = {}, callback) {
    // this function will get all existing courses from database
    const result = await Request('/myinfo', {methods: 'GET', data});
    callback(result);
}

export async function getCourseInfo(data = {}, course_id, callback) {
    // this function will get all existing courses from database
    const result = await Request('/courseinfo?course_id='+course_id, {methods: 'GET', data});
    callback(result);
}

export async function setUserInfo(data = {}, callback) {
    // this function will set user's data to database
    await Request('/myinfo', {methods: 'POST', data});
    callback();
}

export async function setCourseInfo(data = {}, callback) {
    // this function will set courses's data to database
    await Request('/courseinfo', {methods: 'POST', data});
    callback();
}

// export async function putPhoto(data = {},headers = {}, callback) {
//     // this function will set user's data to database
//     const result = await Request('/photo', { methods: 'PUT', data:data, headers: headers });
//     callback(result);
// }

export function putPhoto(data = {}, headers = {}, callback) {
    // this function will set user's data to database
    axios({
        method: 'put',
        url: config.domainPath + '/photo',
        data: data,
        headers: headers,
    }).then((res) => {
        console.log(res);
        callback(res.data.batchId + "." + headers["filesuffix"]);
        // res.data.batchId + "." + headers["filesuffix"]
    });
}

