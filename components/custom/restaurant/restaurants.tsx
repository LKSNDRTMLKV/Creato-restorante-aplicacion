'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { JSON_SERVER_PORT, LOCAL_SERVER_URL, RESTAURANTS_ROUTE } from '@/constants';
import { RestaurantProps } from '@/interface/restaurant';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const RestaurantsPage: React.FC = () => {

    const router = useRouter()
    const [restaurantsState, setRestaurantsState] = React.useState<RestaurantProps[]>([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await await axios.get(LOCAL_SERVER_URL + JSON_SERVER_PORT + RESTAURANTS_ROUTE)
                setRestaurantsState(data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            {restaurantsState.length > 0 ? (
                <div className='m-8'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 '>
                        {restaurantsState.map((restaurant: RestaurantProps, idx: number) => {
                            return (
                                <Card
                                    key={restaurant.id}
                                    className="cursor-pointer"
                                >
                                    <CardHeader>
                                        <CardTitle className='text-center mb-2'>
                                            {restaurant.name}
                                        </CardTitle>

                                        <CardDescription>
                                            {restaurant.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className='flex flex-col gap-2'>
                                        <Image
                                            src={restaurant.picture!}
                                            alt='restaurant-picture'
                                            width={420}
                                            height={220}
                                            className="min-h-60 max-h-60 rounded-md"
                                        />
                                        <p>{restaurant.city}</p>
                                        <p>{restaurant.address}</p>
                                        <p>
                                            {restaurant.cuisines.map((cuisine) => cuisine).join(", ")}
                                        </p>
                                        <p>
                                            {restaurant.opened}
                                        </p>
                                    </CardContent>

                                    <CardFooter>
                                        <Button variant={"link"} className='ml-auto'>
                                            <Link href={`/${restaurant.id}`}>
                                                Ver restorante
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className='w-full flex justify-center my-4'>
                    <h1 className='text-3xl'>
                        Restaurantes no creados o encontrados !
                    </h1>
                </div>
            )}
        </>
    );

}

export default RestaurantsPage