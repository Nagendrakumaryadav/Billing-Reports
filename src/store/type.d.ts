interface IBilling {
    id?: string
    description: string
    category: string
    amount: number
    date: Moment | null
}

interface IBillCHart {
    month?: string
    value?: number;
}

type BillingState = {
    bills: IBilling[]
}

type BillingAction = {
    type: string
    bill: IBilling
}

type DispatchType = (args: BillingAction) => BillingAction