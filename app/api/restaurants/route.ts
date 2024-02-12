// NOT USED SINCE WE WENT WITH JSON_SERVER
import { JSON_SERVER_PORT, LOCAL_SERVER_URL, RESTAURANTS_ROUTE } from "@/constants";
import { RestaurantPageProps } from "@/interface/restaurant";
import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        const { restaurants}  : RestaurantPageProps = await axios.get(LOCAL_SERVER_URL + JSON_SERVER_PORT + RESTAURANTS_ROUTE)
        return NextResponse.json(restaurants)
    } catch (err: any) {
        console.log("RESTAURANTS_GET", err)
        return new NextResponse
    }
}