import { Tables } from "../Database";

export interface UserModel {
    app_metadata: {
        provider: string,
        providers: string[]
    },
    aud: string,
    confirmation_sent_at: string,
    confirmed_at: string,
    created_at: string,
    email: string,
    email_confirmed_at: string,
    id: string,
    identities: {
        created_at: string,
        email: string,
        identity_data: {
            email: string,
            email_verified: boolean,
            phone_verified: boolean,
            sub: string
        },
        identity: string,
        last_sign_in_at: string;
        provider: string,
        updated_at: string,
        user_id: string
    }[],
    last_sing_in_at: string,
    phone: string,
    profile: Tables<'profiles'>,
    role: string,
    updated_at: string,
    user_metadata: {}

}