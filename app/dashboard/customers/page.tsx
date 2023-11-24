import { fetchFilteredCustomers } from "@/app/lib/data"
import CustomersTable from "@/app/ui/customers/table"
import Pagination from "@/app/ui/invoices/pagination";
import { useSearchParams } from "next/navigation"

const Page = async ({ searchParams }: {
    searchParams?: {
        query?: string;
    };
}) => {

    const query = searchParams?.query || ''

    const customers = await fetchFilteredCustomers(query)
    return (
        <div>
            <CustomersTable customers={customers} />
        </div>
    )
}

export default Page
