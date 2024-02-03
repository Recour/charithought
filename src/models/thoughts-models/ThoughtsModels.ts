import { firestore } from 'firebase';

export interface Thought {
    id: number
    message: string
    timestamp: firestore.Timestamp
    price: number
    charity: string
    user: any
    orderID: string
}

export interface ThoughtsList {
    thoughts: Array<Thought>
}