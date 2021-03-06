/*************
 * Created by pan hong fei on 15/8/17.
 *
 * response combo request by split
 * can be use with css and scripts
 *
 * @param {string} params - like ??p1/a.js,p2/b.js,p3/(c.js,d.coffee)
 * @param {string} path - parent dir, like /javascripts/
 * @param {function} handler - 回调函数(optional)
 * **********/

module.exports = function (params, path, handler) {
  var tpl = "{name}/jquery.{name}.js",
      res = [];
  params = params.replace('??', '');
  path = path ? path : '';

  //===find () and replace split , by &
  var matched = params.match(/\/\(.*\)/g) || [];
  matched.forEach(function (item) {
    params = params.replace(item, item.replace(',', '&'));
  });

  //===map path to file
  var array = params.split(',');
  array.forEach(function (item) {
    var m = item.match(/\/\(.*\)/g);
    if (m && m.length > 0) {
      var f = item.replace(m[0], '');
      var a = m[0].replace('/', '').replace('(', '')
        .replace(')', '').split('&');
      a.forEach(function (s) {
        if (s.indexOf('.') == -1)
          s = tpl.replace(/{name}/g, s);
        res.push(path + f + "/" + s);
      });
    } else {
      res.push(path + item);
    }
  });

  if (typeof handler === 'function') handler(res);
  return res;
};
