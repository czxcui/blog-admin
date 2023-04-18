import layout from '@/Layout/index.vue'

const systemRouter =[{

    path:'/system',
    component:layout,
    redirect:'/system/user',
    name:'system',
    meta:{title:"系统管理",icon:"display-code"},
    children:[
        {
            path:"/system/route",
            component:()=>import("@/views/system/test.vue"),
            name:'route',
            meta:{title:"路由管理",icon:"display-arrow-right"}
        },
        {
            path:"/system/test2",
            component:()=>import("@/views/system/test2.vue"),
            name:'test2',
            meta:{title:"test2",icon:"display-arrow-left"},
            children:[
                {
                    path:"/system/test3",
                    component:()=>import("@/views/system/test.vue"),
                    name:'test3',
                    meta:{title:"test3",icon:"laptop-error"}
                },
            ]
        }
    ]


}]

export default systemRouter