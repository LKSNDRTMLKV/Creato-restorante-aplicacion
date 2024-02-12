export interface RestaurantProps {
    id: string,
    name: string,
    description?: string,
    picture?: string,
    address: string,
    cuisines: string[],
    city: string,
    opened: string,
}

export interface RestaurantPageProps {
    restaurants: RestaurantProps[]
}

export interface RestaurantFormProps {
    initialData: RestaurantProps | null
}
