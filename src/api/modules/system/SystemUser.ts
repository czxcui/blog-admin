import service from "../../request";

 class SystemUser {
  public async page(data = { currentPage: 0, pageSize: 10 }) {
    return await new Promise((resolve, reject) => {
      service({
        url: "/user",
        method: "post",
        data,
      })
        .then((r) => {
          resolve(r.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  public async updateUserStatus(data = {}) {
    return await new Promise((resolve, reject) => {
      service({
        url: "/user",
        method: "put",
        data,
      })
        .then((r) => {
          console.log(r);
          resolve(r.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  public async updateUser(data = {}) {
    return await new Promise((resolve, reject) => {
      service({
        url: "/user/up_user",
        method: "put",
        data,
      })
        .then((r) => {
          console.log(r);
          resolve(r);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  public async deleteUser(id: number) {
    return await new Promise((resolve, reject) => {
      service({
        url: `/user/${id}`,
        method: "Delete",
      })
        .then((r) => {
          console.log(r);
          resolve(r.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  public async addUser(data: {}) {
    return await new Promise((resolve, reject) => {
      service({
        url: "/user/add_user",
        method: "post",
        data,
      })
        .then((r) => {
          
          console.log(r);
          resolve(r);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
  public async getUserInfo(id: number) {
    return await new Promise((resolve, reject) => {
      service({
        url: `/user/${id}`,
        method: "post",
      })
        .then((r) => {
          resolve(r.data)
        })
        .catch((e) => {
          reject(e)
        });
    });
  }
}

const userApi=new SystemUser();
export default userApi;