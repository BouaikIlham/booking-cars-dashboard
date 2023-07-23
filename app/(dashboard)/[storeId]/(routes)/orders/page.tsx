import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatter } from "@/lib/utils"; 
import { OrderColumn } from "./components/columns";
import OrderClient from "./components/Client";

interface OrdersPageProps {
  params: {storeId: string}
}

const OrdersPage: React.FC<OrdersPageProps> = async ({
  params
}) => {

  ///////// fetch orders //////////
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include:  {
          car: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
    const formattedOrders: OrderColumn[] = orders.map((order) => ({
      id: order.id,
      isPaid: order.isPaid,
      address: order.address,
      phone: order.phone,
      cars: order.orderItems.map((orderItem) => orderItem.car.model).join(', '),
      totalPrice: formatter.format(order.orderItems.reduce((total, order) => {
            return total + Number(order.car.price)
      }, 0)),
      createdAt: format(order.createdAt, "MMM do, yyyy")
    }))    
    return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <OrderClient data={formattedOrders} />
        </div>
    </div>
  )
}

export default OrdersPage;