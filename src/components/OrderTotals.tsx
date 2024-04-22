import { Dispatch, useMemo } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  dispatch: Dispatch<OrderActions>
}

const OrderTotals = ({ order, tip, dispatch }:OrderTotalsProps) => {

  const subTotalAmount = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [order])
  const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order])
  const totalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order])
  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y propina:</h2>

        <p>Subtotal a pagar: {""}
          <span className="font-bold">{ formatCurrency(subTotalAmount) }</span>
        </p>

        <p>Propina: {""}
          <span className="font-bold">{ formatCurrency(tipAmount) }</span>
        </p>

        <p>Total a pagar: {""}
          <span className="font-bold">{ formatCurrency(totalAmount) }</span>
        </p>
        
      </div>
      <button
        className="w-full bg-black p-3 uppercase text-white font-bold mt-10"
        onClick={() => dispatch({ type: 'place-order' })}
      >
        Guardar orden
      </button>
    </>
  )
}

export { OrderTotals }
