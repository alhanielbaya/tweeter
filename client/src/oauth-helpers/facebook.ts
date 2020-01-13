import { login, sanitizeInput } from './oauthHelpers';
import { IfacebookRes } from './oauthTypes';

export async function facebookSuccess(
  response: IfacebookRes,
  cb: (x: boolean) => void
) {
  const res = response;
  const unsanitizedProfile = { imageUrl: res.picture.data.url, ...res };

  const p = await sanitizeInput(unsanitizedProfile);

  const data = {
    profile: {
      email: p.email,
      name: p.name,
      imageUrl: p.imageUrl,
      atSign: p.atSign
    }
  };

  login(data, cb);
}
