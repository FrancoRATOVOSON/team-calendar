import CONFIG from '@/lib/config'
import { fakeActionTypeList, fakeUserList } from '@/lib/faker'
import {http, HttpResponse, RequestHandler} from 'msw'

export const handlers:Array<RequestHandler> = [
  http.get(`${CONFIG.base_url}/user`, () => {
    console.log('Captured a "GET /user" request')
    return HttpResponse.json(fakeUserList())
  }),

  http.get(`${CONFIG.base_url}/action`, () => {
    console.log('Captured a "GET /action" request')
    return HttpResponse.json(fakeActionTypeList())
  }),

  http.post(`${CONFIG.base_url}/type-action`, ({request}) => {
    console.log(request.body)
    return new HttpResponse(null, {
      status: 201,
      statusText: 'created'
    })
  }),

  http.patch(`${CONFIG.base_url}/action`, ({params}) => {
    console.log(`Patching ${params.id}`)
    return new HttpResponse(null, {
      status: 201,
      statusText: 'updated'
    })
  }),
]