import prismadb from "@/lib/prismadb"
import CarForm from "./components/CarForm"

const Car = async ({
    params
}: {
    params: {carId: string, storeId: string}
}) => {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const car = await prismadb.car.findUnique({
        where: {
            id: params.carId
        },
        include: {
            images: true
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <CarForm initialData={car}
                         categories={categories}
                />
            </div>
        </div>
    )
}

export default Car; 