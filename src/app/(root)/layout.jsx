"use client";

import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const RootLayout = ({ children }) => {
    return (
        <Provider store={store}>
            <main className="p-3 lg:p-5">
                <div className="lg:flex gap-x-10">
                    <aside>
                        <Sidebar />
                    </aside>

                    <section className="lg:ml-[240px] flex-1 py-3 lg:py-8">
                        <MobileSidebar />
                        {children}
                    </section>
                </div>
            </main>
        </Provider>
    );
};

export default RootLayout;