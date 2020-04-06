import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../../config';

export const issueToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET, {
    expiresIn: 360000,
  });
  return `Bearer ${token}`;
};
