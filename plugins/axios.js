const getToken = function() {
  if (typeof window === `object` && window) {
    return window.localStorage.getItem(`token`);
  } else {
    return ``;
  }
};

export default function({ $axios, redirect, req }, inject) {


  const ajax = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  });

  ajax.interceptors.request.use((req) => {
    req.headers.common['token'] = getToken();
    return req;
  });
  ajax.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        if (response.data.status !== `success`) {
          return Promise.reject(response.data);
        } else {
          return response.data;
        }
      } else {
        return {
          status: `error`,
          code: response.status,
          error: response.message || response.error
        };
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Inject to context as $request
  inject('ajax', ajax);
}
