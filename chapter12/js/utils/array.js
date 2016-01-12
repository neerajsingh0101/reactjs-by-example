var ArrayUtil = (function () {
  function in_groups_of(arr, n) {
    var ret = [];
    var group = [];
    var len = arr.length;

    for (var i = 0; i < len; ++i) {
      group.push(arr[i]);
      if ((i + 1) % n == 0) {
        ret.push(group);
        group = [];
      }
    }

    if (group.length) ret.push(group);

    return ret;
  };


  return {'in_groups_of': in_groups_of}
}());

module.exports = ArrayUtil;
