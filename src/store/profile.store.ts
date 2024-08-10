import { atom } from "jotai";
interface IProfile {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  address: string;
  nonce: number;
  avatar: string;
  username: string;
  role: string;
  telegram_id: string;
}
export const atomProfile = atom<IProfile | undefined>(undefined);
