import CONFIG from "@/lib/config";
import { fakeActionTypeList, fakeUserList } from "@/lib/faker";
import { http, HttpResponse, RequestHandler } from "msw";

const emptyResponse = new HttpResponse(null, {
  status: 201,
  statusText: "done"
});

export const handlers: Array<RequestHandler> = [
  http.get(`${CONFIG.base_url}/user`, () => {
    console.log('Captured a "GET /user" request');
    return HttpResponse.json(fakeUserList());
  }),

  http.get(`${CONFIG.base_url}/action`, () => {
    console.log('Captured a "GET /action" request');
    return HttpResponse.json(fakeActionTypeList());
  }),

  http.post(`${CONFIG.base_url}/type-action`, () => {
    return emptyResponse;
  }),

  http.patch(`${CONFIG.base_url}/action/:id`, ({ params }) => {
    console.log(`Patching ${params.id}`);
    return emptyResponse;
  }),

  http.delete(`${CONFIG.base_url}/action/:id`, ({ params }) => {
    console.log(`Deleting ${params.id}`);
    return emptyResponse;
  }),

  http.post(`${CONFIG.base_url}/user`, () => {
    return emptyResponse;
  })
];
