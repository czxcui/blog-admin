// /**
//  * 递归过滤路由表
//  * @param routes 异步路由
//  * @param roles  角色
//  * @returns
//  */
// export function fillerAsyncRouters(routes, roles) {
//   const res = [];

//   routes.forEach((route) => {
//     const tmp = { ...route };
//     //判断是否有子路由
//     if (tmp.children) {
//       tmp.children = fillerAsyncRouters(tmp.children, null);
//     }
//     res.push(tmp);
//   });

//   return res;
// }

//白名单
const routeF=["/","/home"]


export function fillerAsyncRouters(routes) {
  const res = [];
 
  routes.forEach((route) => {
    // console.log(route)
    if(routeF.indexOf(route.url)!==-1){
        return
    }

    const tmp = {
   
      path: route.url,
      component:()=> import(route.component),
      redirect: route.redirect,
      name: route.name,
      meta: {
        id: route.id,
        title: route.title,
        icon: route.icon,
        sort: route.sort,
        type:route.type,
        parentId: route.parentId,
      },
    };


 
    if(route.type===2&&route.permissionVoList.length===0){
        tmp.children=[]
    }


    //type=2为目录类型
    if (route.permissionVoList&&route.permissionVoList.length > 0) {
      tmp.children = fillerAsyncRouters(route.permissionVoList || []);
    }
    res.push(tmp);
  });

  return res;
}
