import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation';

export default async function Page() {


    const { isAuthenticated } = getKindeServerSession()
    const isAuth = await isAuthenticated()

    if (!isAuth) {
        redirect("/api/auth/login")
    }

    return (
        <main>
            {isAuth && <div>
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                    Dashboard
                </h1>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <CardWrapper />
                    </Suspense>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    <Suspense fallback={<RevenueChartSkeleton />}>
                        <RevenueChart />
                    </Suspense>
                    <Suspense fallback={<LatestInvoicesSkeleton />}>
                        <LatestInvoices />
                    </Suspense>
                </div>
            </div>}
        </main>

    );
}