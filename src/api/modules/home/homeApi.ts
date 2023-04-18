import service from "@/api/request";


class HomeApi{

    public async getThisLastLiveNum(){

        return await new Promise((resolve,reject)=>{
            service({
                url:"/ulog/tlLiveNum",
                method:"get"
            }).then(r=>{
               
                resolve(r)
            }).catch(e=>{

                reject(e)
            })
        })
    }

    public async getWith15DayVisit(){

        return await new Promise((resolve,reject)=>{

            service({
                url:"/ulog/with15Visit",
                method:"get"
            }).then(r=>{
                resolve(r)
            }).catch(e=>{

                reject(e)
            })
        })
    }

    public async getWeekLiveList(){

            return await new Promise((resolve,reject)=>{

                service({
                    url:"/ulog/thisWeekLiveNum",
                    method:"get"

                }).then(r=>{

                    resolve(r)
                }).catch(e=>{

                    reject(e)
                })
            })

    }

}

const homeApi=new HomeApi()

export default homeApi;