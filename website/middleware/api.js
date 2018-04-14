let apiMap = {
  '/api/user': {
    name: 'geeknull',
    age: 18
  },
  '/api/list': [
    {id: '1', name: '香蕉'},
    {id: '2', name: '桔子'},
    {id: '3', name: '苹果'},
    {id: '4', name: '橘子'},
    {id: '5', name: '菠萝'},
    {id: '6', name: '橙子'},
    {id: '7', name: '西瓜'},
    {id: '8', name: '桃子'},
    {id: '9', name: '辣椒'},
  ],
  '/api/detail': {
    name: '香蕉',
    place: '泰国',
    describe: '补充能力，吃香蕉~',
    city: '泰姬陵',
    remark: '大哥，泰姬陵不是泰国的！',
  },
};

module.exports = (ctx, next) => {
  for (let key in apiMap) {
    if (ctx.path.includes(key)) {
      ctx.body = apiMap[key];
      break;
    }
  }
  return next();
};
