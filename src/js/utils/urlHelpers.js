export function getQueryParam(key, query) {
  let result = '';
  let params = query.replace(/^\?/, '').split('&');

  for (let i = 0; i < params.length; i++) {
    let param = params[i].split('=');

    if (param[0] === key) {
      result = param[1];
    }
  }

  return result;
}
