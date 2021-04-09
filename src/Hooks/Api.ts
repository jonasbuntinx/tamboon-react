import * as React from "react";
import { Failure, Loading, NotAsked, RemoteData, Success } from "../Data/RemoteData";
import { API_ENDPOINT } from "../Env";

type RequestSpec<RequestBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body?: RequestBody;
};

type Response<ResponseBody> = {
  status: number;
  headers: Headers;
  body: () => ResponseBody;
};

export type Request<ResponseBody> = Promise<Response<ResponseBody>>;

// This function fetches the data and parses the result into a JSON. The parse error are deferred using thunks.
export const fetchJSON = <RequestBody, ResponseBody>(request: RequestSpec<RequestBody>): Request<ResponseBody> =>
  fetch(API_ENDPOINT + request.url, {
    method: request.method,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(request.body),
  }).then(response => {
    const buildResponse = (body: () => ResponseBody) =>
      Promise.resolve({
        status: response.status,
        headers: response.headers,
        body,
      });
    return response
      .json()
      .then(json => buildResponse(() => json))
      .catch(err =>
        buildResponse(() => {
          throw err;
        })
      );
  });

export const hasSuccessStatus = <T>(response: Response<T>): boolean => response.status >= 200 && response.status < 300;

// A simple hook to handle a async useEffect with setState, it also wraps the result into RemoteData
export const useApi = <RequestBody, ResponseBody>(
  request: (body: RequestBody) => Request<ResponseBody>
): [RemoteData<ResponseBody, string>, (body: RequestBody) => Promise<RemoteData<ResponseBody, string>>] => {
  const ref = React.useRef({ unmounted: false });
  const [state, setState] = React.useState<RemoteData<ResponseBody, string>>(NotAsked);
  React.useEffect(
    () => () => {
      ref.current.unmounted = true;
    },
    []
  );
  const call = React.useMemo(
    () => async (body: RequestBody) => {
      setState(Loading);
      const remoteData = await request(body)
        .then(response => {
          return hasSuccessStatus(response) ? Success(response.body()) : Failure("Error");
        })
        .catch(() => {
          return Failure("Error");
        });
      if (!ref.current.unmounted) {
        setState(remoteData);
      }
      return remoteData;
    },
    [request]
  );
  return [state, call];
};
