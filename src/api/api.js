import { Request } from '@/config/request'


export function getCourse(data = {}) {
    // return Request('/course', { methods: 'GET', data });
  }

  export function getLIST(data = {}) {
    return Request('/LIST', { methods: 'POST', data });
  }

export async function getAllExistingCourse(data = {},callback) {
    // this function will get all existing courses from database
    const result =  await Request('/course', { methods: 'GET', data });
    callback(result);
}

export async function getUserInfo(data = {},callback) {
    // this function will get all existing courses from database
    const result = await Request('/myinfo', { methods: 'GET', data });
    callback(result);
}

