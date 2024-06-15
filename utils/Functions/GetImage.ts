import supabase from "../supabase/createClient"

export const getImage = (url: string) => {
    const { data } = supabase
        .storage
        .from('henig')
        .getPublicUrl(url)
    return data.publicUrl
}