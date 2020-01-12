import { Iprofile } from './oauthTypes';
import axios from 'axios';

export async function sanitizeInput(profile: Iprofile): Promise<Iprofile> {
  const { name, email, imageUrl } = profile;
  const splittedAtSign = email.split('@')[0];
  const newName = name[64] ? name.substring(0, 63) : name;
  const cutAtSign = splittedAtSign[15]
    ? splittedAtSign.substring(0, 14)
    : splittedAtSign;

  const res: { data: { uid: number } } = await axios.get('users/getId');
  const id = res.data.uid;
  const uniquedAtSign = `${cutAtSign}${id}`;

  return {
    email: email,
    name: newName,
    imageUrl: imageUrl,
    atSign: uniquedAtSign
  };
}

export function login(data: { profile: Iprofile }, cb: (x: boolean) => void) {
  axios.post('auth/login', data).then((res: { status: number }) => {
    if (res.status === 200) {
      cb(true);
    } else {
      cb(false);
    }
  });
}
