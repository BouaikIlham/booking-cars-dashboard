import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import CarsClient from "./components/Client";
import { CarColumn } from "./components/columns";
interface CarsPageProps {
  params: {storeId: string}
}

const CarsPage: React.FC<CarsPageProps> = async ({
  params
}) => {

  ///////// fetch cars //////////
  const cars = await prismadb.car.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
    const formattedCars: CarColumn[] = cars.map((car) => ({
      id: car.id,
      model: car.model,
      mileage: car.mileage,
      capicity: car.capicity,
      transmission: car.transmission,
      isAvailable: car.isAvailable,
      description: car.description,
      price: car.price,
      createdAt: format(car.createdAt, "MMM do, yyyy")
    }))    
    return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CarsClient data={formattedCars} />
        </div>
    </div>
  )
}

export default CarsPage;