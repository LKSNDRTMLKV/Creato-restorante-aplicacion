'use client'

import { RestaurantForm } from '@/components/custom/restaurant/restaurants-form'
import { JSON_SERVER_PORT, LOCAL_SERVER_URL, RESTAURANTS_ROUTE } from '@/constants'
import { RestaurantProps } from '@/interface/restaurant'
import axios from 'axios'
import React from 'react'
import NotFoundPage from './not-found'

const UpdateRestaurantPage = ({
    params
}: {
    params: { restaurantId: string }
}) => {

    const [restaurantData, setRestaurantData] = React.useState<RestaurantProps>()

    React.useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await await axios.get(LOCAL_SERVER_URL + JSON_SERVER_PORT + RESTAURANTS_ROUTE + '/' + params.restaurantId)
                setRestaurantData(data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        }
        fetchData();
    }, [params.restaurantId]);

    return (
        <>
            {restaurantData ?
                <RestaurantForm initialData={restaurantData} /> :
                <NotFoundPage />
            }
        </>
    )
}

export default UpdateRestaurantPage