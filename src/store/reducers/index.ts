import { ADD_BILL, REMOVE_BILL, UPDATE_BILL } from "../actionTypes"
import { v4 as uuidv4 } from 'uuid';

const initialState: BillingState = {
    bills: []
}

const reducer = (
    state: BillingState = initialState,
    action: BillingAction
): BillingState => {
    const { id, description, category, amount, date } = action.bill || {}
    switch (action.type) {
        case ADD_BILL:
            const newBill: IBilling = {
                id: uuidv4(),
                description: description,
                category: category,
                amount: amount,
                date: date
            }
            return {
                ...state,
                bills: [...state.bills, newBill]
            }
        case UPDATE_BILL:
            return {
                ...state,
                bills: state.bills.map((bill: IBilling) => bill.id === id ?
                    {
                        ...bill,
                        description: description,
                        category: category,
                        amount: amount,
                        date: date
                    }
                    : bill)
            }
        case REMOVE_BILL:
            const updatedBills: IBilling[] = state.bills.filter(
                bill => bill.id !== id
            )
            return {
                ...state,
                bills: updatedBills,
            }
    }
    return state
}

export default reducer