import { IFirebaseConnection } from "@/Core/Common/Interfaces/IFirebaseConnection";
import { App, applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { injectable } from "inversify";

@injectable()
export class FirebaseConnection implements IFirebaseConnection {
  private readonly app: App;

  constructor() {
    this.app = initializeApp({
      credential: applicationDefault(), // env GOOGLE_APPLICATION_CREDENTIALS
    });
  }

  async verifyIdToken(idToken: string) {
    return await getAuth(this.app).verifyIdToken(idToken);
  }
}
