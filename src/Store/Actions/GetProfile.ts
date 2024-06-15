import { Dispatch } from 'redux';
import supabase from '../../../utils/supabase/createClient';
import { setProfileToUser } from '../slices/AuthSlice';

export const getProfile = (user_id: string) => {
    return async (dispatch: Dispatch) => {
        try {

            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user_id)
            if (error) {
                throw error;
            }
            if (profile) {
                dispatch(setProfileToUser(profile[0]))
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
};
