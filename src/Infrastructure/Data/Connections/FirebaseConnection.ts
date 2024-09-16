import { config } from "@/config";
import { IFirebaseConnection } from "@/Core/Common/Interfaces/IFirebaseConnection";
import { App, applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { injectable } from "inversify";
import { fetch } from "undici";

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

  async signInWithEmailAndPassword(email: string, password: string) {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        config.firebase_api_key,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const body = await res.text();

    if (!res.ok) {
      console.error(JSON.parse(body));
      throw new Error("Failed to sign in");
    }

    const json: any = JSON.parse(body);
    return json.idToken;
  }
}
