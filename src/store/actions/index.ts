import { ADD_BILL, REMOVE_BILL, UPDATE_BILL } from "../actionTypes"

const createAction = (type: string, bill: IBilling) => {
    return { type, bill }
}

/**
 * @description for fake api call to have a real time feel 
 */
export const simulateHttpRequest = (action: BillingAction) => {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}

export const addBill = (bill: IBilling) => simulateHttpRequest(createAction(ADD_BILL, bill))

export const removeBill = (bill: IBilling) => simulateHttpRequest(createAction(REMOVE_BILL, bill))

export const updateBill = (bill: IBilling) => simulateHttpRequest(createAction(UPDATE_BILL, bill))