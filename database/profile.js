import { nanoid } from 'nanoid';

class Profile {
  constructor(user) {
    this.login = user.login;
    this.password = user.password;
    this.displayName = user.displayName;
    this.id = nanoid();
  }
}

export default Profile;
