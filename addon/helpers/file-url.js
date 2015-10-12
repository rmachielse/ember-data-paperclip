import Ember from 'ember';

export function fileUrl(params) {
  var file = params[0];
  var style = params[1];

  return file.url(style);
}

export default Ember.Helper.helper(fileUrl);
