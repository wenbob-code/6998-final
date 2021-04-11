import { Request } from '@/config/request'


export function getCourse(data = {}) {
    // return Request('/course', { methods: 'GET', data });
  }

  export function getLIST(data = {}) {
    return Request('/LIST', { methods: 'POST', data });
  }

export function getAllExistingCourse(data = {}) {
    // this function will get all existing courses from database
    return Request('/course', { methods: 'GET', data });
}

export function getUserInfo(data = {}) {
    // this function will get all existing courses from database
    return Request('/myinfo', { methods: 'GET', data });
}