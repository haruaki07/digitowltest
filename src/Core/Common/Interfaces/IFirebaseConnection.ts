import { DecodedIdToken } from "firebase-admin/auth";

export interface IFirebaseConnection {
  verifyIdToken(idToken: string): Promise<DecodedIdToken>;
}
