import { DecodedIdToken } from "firebase-admin/auth";

export interface IFirebaseConnection {
  verifyIdToken(idToken: string): Promise<DecodedIdToken>;
  signInWithEmailAndPassword(email: string, password: string): Promise<string>;
}
