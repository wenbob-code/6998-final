import { Request } from '@/config/request'

export function getCourse(data = {}) {
    return Request('/course', { methods: 'GET', data });
  }

  export function getLIST(data = {}) {
    return Request('/LIST', { methods: 'POST', data });
  }
