/* eslint max-classes-per-file: ["error", 2] */
export type Position = {
  x: number;
  y: number;
};

export interface IUser extends Position {
  id: string;
  animationName?: string;
}

class UsersPrivate {
  users: IUser[];
  constructor() {
    this.users = [];
  }

  addUser({ id, x, y }: IUser) {
    this.users.push({ id, x, y });
    return id;
  }

  removeUser(id: string) {
    const newUsers = this.users.filter((user) => user.id !== id);

    if (newUsers.length === this.users.length) {
      return false;
    }
    this.users = newUsers;
    return true;
  }

  getUser(id: string) {
    return this.users.find((u) => u.id === id);
  }
}

export class Users {
  static instance: UsersPrivate;
  constructor() {
    throw new Error("Use Users.getInstance()");
  }
  static getInstance() {
    if (!Users.instance) {
      Users.instance = new UsersPrivate();
    }
    return Users.instance;
  }
}
