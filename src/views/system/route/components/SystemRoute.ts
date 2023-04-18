import service from "@/api/request";

export class SystemRoute {
  public async getPermissionList() {
    return await new Promise((resolve, reject) => {
      service({
        url: "/permiss/list",
        method: "POST",
      })
        .then((r) => {
          // console.log(r);
          resolve(this.filterPermissionList(r.data));
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public async edit(data:Object) {
    return await new Promise((resolve, reject) => {
      service({
        url: "/permiss",
        method: "PUT",
        data
      })
        .then((r) => {
          // console.log(r);
          resolve(r);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public async getPermission(id: number) {
    return await new Promise((resolve, reject) => {
      service({
        url: `/permiss/${id}`,
        method: "GET",
      })
        .then((r) => {
          console.log(r.data);
          resolve(r.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public async add(data = {}) {
    return await new Promise((resolve, reject) => {
      service({
        url: "/permiss/adpermiss",
        method: "POST",
        data,
      })
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public async delete(id: Number) {
    return await new Promise((resolve, reject) => {
      service({
        url: `/permiss/deletepermiss/${id}`,
        method: "DELETE",
      })
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  private filterPermissionList(data: unknown) {
    let res: Permission[] = [];
    data.forEach((element) => {
      if (element.name == "short") {
        res.push(...this.filterPermissionList(element.permissionVoList));
      } else {
        let tmp: Permission = {
          id: element.id,
          name: element.name,
          title: element.title,
          type: RouteTypeCode[--element.type],
          permission: element.permission,
          url: element.url,

          children:
            element.permissionVoList.length > 0
              ? this.filterPermissionList(element.permissionVoList)
              : [],
        };
        res.push(tmp);
      }
    });
    return res;
  }
}

export interface Permission {
  id: number;
  name: string;
  title: string;
  type: string;
  url: string;
  permission: string;
  children?: Permission[];
}

export enum TebleEnumCode {
  add,
  edit,
}

const RouteTypeCode = ["view", "menu", "btn"];
