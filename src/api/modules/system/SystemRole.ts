import service from "@/api/request";

 class SystemRole {
  public async list() {
    return await new Promise((resolve, reject) => {
      service({
        url: "/role",
        method: "get",
      })
        .then((r) => {
          // console.log(r);
          resolve(r.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

const roleApi=new SystemRole();
export default roleApi;