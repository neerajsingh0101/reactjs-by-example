class ArrayUtil {
  static in_groups_of(arr, n) {
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

}

export {ArrayUtil as default};
