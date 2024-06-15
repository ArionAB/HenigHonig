export interface ShippingAddressModel {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    info: string | undefined;
    zip_code: number;
    city: string;
    county: string;
    phone: string;
    first_name_bill: string;
    last_name_bill: string;
    address_bill: string;
    info_bill: string | undefined;
    zip_code_bill: number;
    city_bill: string;
    county_bill: string;
    order_id?: string;
    order_address_id?: string;
}
