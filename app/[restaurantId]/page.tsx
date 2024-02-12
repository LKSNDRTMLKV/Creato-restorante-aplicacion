'use client'

import React from 'react'
import { RestaurantForm } from '@/components/custom/restaurant/restaurants-form'
import { JSON_SERVER_PORT, LOCAL_SERVER_URL, RESTAURANTS_ROUTE } from '@/constants'
import { RestaurantProps } from '@/interface/restaurant'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import NotFoundPage from './not-found'

const RestaurantPage = ({
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
    <div className="flex justify-center my-4">
      {restaurantData ? (
        <div className='flex flex-col gap-2'>
          <h1 className="text-2xl font-bold mb-2">Name: {restaurantData.name}</h1>
          <Image src={restaurantData.picture!} alt="restaurant-picture" height={200} width={300} />
          <p className="max-w-96">Description: {restaurantData.description}</p>
          <p>Address: {restaurantData.address}</p>
          <p>City: {restaurantData.city}</p>
          <p>Cuisines: {restaurantData.cuisines.join(", ")}</p>
          <p>Opened: {restaurantData.opened}</p>
          {/* Display other properties as needed */}
          <div className='flex w-full my-4'>
            <Button variant={"link"} className='ml-auto'>
              <Link href={`/${restaurantData.id}/update`}>
                Actializaro restorante
              </Link>
            </Button>
          </div>
        </div>
      ) :
      <NotFoundPage />
      }
    </div>
  )
}

export default RestaurantPage