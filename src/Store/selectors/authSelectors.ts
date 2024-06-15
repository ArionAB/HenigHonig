import { Tables } from "../Models/Database";
import { UserModel } from "../Models/User/UserModel";
import { RootState } from "../store";

export const selectCurrentUser = (
    state: RootState
): UserModel | null | undefined => state.auth.currentUser;

