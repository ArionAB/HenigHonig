import { Dispatch } from 'redux';
import { RootState } from '../store';
import supabase from '../../../utils/supabase/createClient';
import { setCurrentUser } from '../slices/AuthSlice';
import { selectCurrentUser } from '../selectors/authSelectors';

export const updateUser = (user: any) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    address: user.address,
                    address_bill: user.addressBill,
                    city: user.city,
                    city_bill: user.city_bill,
                    county: user.county,
                    county_bill: user.county_bill,
                    email: user.email,
                    first_name: user.first_name,
                    first_name_bill: user.first_name_bill,
                    info: user.info,
                    info_bill: user.info_bill,
                    last_name: user.last_name,
                    last_name_bill: user.last_name_bill,
                    phone: user.phone,
                    zip_code: user.zip_code,
                    zip_code_bill: user.zip_code_bill
                })
                .eq('id', user.id)
                .select()


            if (!error) {
                let currentUser = selectCurrentUser(getState())
                console.log('updated succesfully', data)

                let newUser = {
                    ...currentUser,
                    profile: data[0]
                }

                dispatch(setCurrentUser(newUser))
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error updating user', error);
        }
    };
};
