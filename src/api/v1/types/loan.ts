/**
 * Represents loan applications.
 */
export interface Loan{
    id: number;
    name: string;
    amount: number;
    status: string;
}

export const loans: Loan[] = [
    {id: 1, name: "Example Name", amount: 100, status: "unreviewed"},
    {id: 2, name: "Second Name", amount: 50, status: "reviewed"},
    {id: 3, name: "Third Name", amount: 200, status: "approved"},
];