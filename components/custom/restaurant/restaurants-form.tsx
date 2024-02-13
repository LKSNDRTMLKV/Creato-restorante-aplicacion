'use client'

import * as z from "zod"
import { v4 as uuidv4 } from 'uuid';
import { RestaurantFormProps } from "@/interface/restaurant";
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import React from "react";
import axios from "axios";
import { CITIES_ROUTE, CUISINES_ROUTE, JSON_SERVER_PORT, LOCAL_SERVER_URL, RESTAURANTS_ROUTE } from "@/constants";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { IconDropdown } from "react-day-picker";
import Link from "next/link";

const restaurantFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    picture: z.string().optional(),
    address: z.string(),
    cuisines: z.array(z.string()),
    city: z.string(),
    opened: z.string()
})

type RestaurantFormValues = z.infer<typeof restaurantFormSchema>

export const RestaurantForm: React.FC<RestaurantFormProps> = ({
    initialData
}) => {

    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false)
    const [popoverOpen, setPopoverOpen] = React.useState<boolean>(false);
    const [cuisines, setCuisines] = React.useState<string[]>([])
    const [cities, setCities] = React.useState<string[]>([])

    const form = useForm<RestaurantFormValues>({
        resolver: zodResolver(restaurantFormSchema),
        defaultValues: initialData || {
            id: uuidv4(),
            name: "",
            description: "",
            picture: "",
            address: "",
            cuisines: [],
            city: "",
            opened: "",
        }
    })

    React.useEffect(() => {
        async function fetchData() {
            try {
                const {
                    data: cuisinesData
                } = await axios.get(
                    LOCAL_SERVER_URL +
                    JSON_SERVER_PORT +
                    CUISINES_ROUTE
                )
                setCuisines(cuisinesData)

                const {
                    data: citiesData
                } = await axios.get(
                    LOCAL_SERVER_URL +
                    JSON_SERVER_PORT +
                    CITIES_ROUTE
                )
                setCities(citiesData)

            } catch (err) {
                toast({
                    title: "Fatale cocina o ciudades",
                    // description: JSON.stringify(err, null, 2),
                    variant: "destructive",
                })
            }
        }

        fetchData()
    }, [])

    const handleSubmit = async (data: RestaurantFormValues) => {
        try {
            setLoading(true);
            if (!!initialData) {
                await axios.patch(`${LOCAL_SERVER_URL}${JSON_SERVER_PORT}${RESTAURANTS_ROUTE}/${initialData.id}`, data)
            }
            else {
                await axios.post(`${LOCAL_SERVER_URL}${JSON_SERVER_PORT}${RESTAURANTS_ROUTE}`, data);
            }

            router.refresh();
            router.push(`/`);

            toast({
                title: !initialData ? "Restorante creato" : "Restorante actualizado"
            });
        }
        catch (err) {
            toast({
                title: `Algo salio mal!`,
                // description: JSON.stringify(err, null, 2),
                variant: "destructive"
            });
        }
        finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`${LOCAL_SERVER_URL}${JSON_SERVER_PORT}${RESTAURANTS_ROUTE}/${initialData?.id}`)

            router.refresh();
            router.push(`/`);

            toast({
                title: "Restorante delito"
            })
        }
        catch (err) {
            toast({
                title: "Delito restoranto failo opaaa.",
                variant: "destructive"
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center mt-2 mb-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 max-w-lg w-4/5"
                >
                    <div className="grid grid-cols-1 justify-center gap-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="relative my-2">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Restaurant name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="whitespace-nowrap absolute left-0" />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="relative my-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={loading}
                                            placeholder="Restaurant description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="whitespace-nowrap absolute left-0" />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="picture"
                            render={({ field }) => (
                                <FormItem className="relative my-2">
                                    <FormLabel>Picture URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Restaurant picture"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="whitespace-nowrap absolute left-0" />
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="relative my-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Restaurant address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="whitespace-nowrap absolute left-0" />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        {/* <FormField
                            control={form.control}
                            name="cuisines"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cuisines</FormLabel>
                                    <Select
                                        multiple
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a cuisine" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cuisines.map((cuisine: string, idx: number) => (
                                                <SelectItem key={idx} value={cuisine}>{cuisine}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                     <FormMessage className="whitespace-nowrap absolute left-0" />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="cuisines"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col justify-start relative my-2">
                                        <FormLabel>Cuisines</FormLabel>
                                        <FormControl>
                                            <DropdownMenu open={popoverOpen} onOpenChange={setPopoverOpen}>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className="flex justify-between text-gray-500 pl-3 pr-4">
                                                        {Array.isArray(field.value) && field.value.length > 0 ?
                                                            field.value?.join(", ") :
                                                            "Restaurant cuisines"
                                                        }
                                                        <IconDropdown />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56">
                                                    <DropdownMenuLabel>Choose cuisines</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {cuisines.map((cuisine, idx) => (
                                                        <DropdownMenuCheckboxItem key={idx} className="flex gap-4">
                                                            <Checkbox
                                                                checked={(field.value || []).includes(cuisine)}
                                                                onCheckedChange={(isChecked) => {
                                                                    const updatedCuisines = isChecked
                                                                        ? [...(field.value || []), cuisine]
                                                                        : (field.value || []).filter((c) => c !== cuisine);
                                                                    field.onChange(updatedCuisines);
                                                                }}
                                                            />
                                                            {cuisine}
                                                        </DropdownMenuCheckboxItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormControl>
                                        <FormMessage className="whitespace-nowrap absolute left-0 -bottom-6" />
                                    </FormItem>
                                );
                            }}
                        />


                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="relative my-2">
                                    <FormLabel>City</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a city"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cities.map((city: string, idx: number) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={city}
                                                >
                                                    {city}
                                                </SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="whitespace-nowrap absolute left-0" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="opened"
                            render={({ field }) => (
                                <FormItem className="relative my-2">
                                    <FormLabel>Opened</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Restaurant opening"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="whitespace-nowrap absolute left-0" />
                                </FormItem>
                            )}
                        />


                        {/* Too lazy to set this */}

                        {/*
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>

                    <div className="flex justify-between">
                        {!!initialData ?
                            <Button variant="destructive" type="button" onClick={handleDelete}>
                                Delito restorante
                            </Button> :
                            null
                        }

                        <Button disabled={loading} className="ml-auto" type="submit">
                            {!!initialData ? "Actualizaro restorante" : "Ahorrar restorante"}
                        </Button>
                    </div>

                    <div className="flex justify-between">
                        {!!initialData ?
                            <Button variant="link" type="button">
                                <Link href={`/${params.restaurantId}`}>
                                    Volver a restaurant
                                </Link>
                            </Button> :
                            null
                        }
                        {!!initialData ?
                            <Button variant="link" type="button">
                                <Link href={`/`}>
                                    Ver todo restorantes
                                </Link>
                            </Button> :
                            null
                        }
                    </div>
                </form>
            </Form>
        </div>
    )
}