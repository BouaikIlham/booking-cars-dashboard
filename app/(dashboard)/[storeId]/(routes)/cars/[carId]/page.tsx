import prismadb from "@/lib/prismadb"
import CarForm from "./components/CarForm"

const Car = async ({
    params
}: {
    params: {carId: string}
}) => {

    const car = await prismadb.car.findUnique({
        where: {
            id: params.carId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <CarForm initialData={car} />
            </div>
        </div>
    )
}

export default Car; 