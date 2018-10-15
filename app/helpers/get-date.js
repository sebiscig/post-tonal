import { helper as buildHelper } from '@ember/component/helper';


export function getDate(params/*, hash*/) {
  if (params[0] === 'year') {
    return new Date().getFullYear();
  }
}

export default buildHelper(getDate);
