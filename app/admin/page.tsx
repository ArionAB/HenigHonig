'use client'


// import AdminOrdersTable from "@/components/Admin/AdminOrdersTable"
// import Tabs from "@/components/Tabs/Tabs";
import { useState } from "react";
import AddItemForm from "@/components/Admin/AddItemForm";
import Tabs from "@/components/Tabs/Tabs";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };


    const tabComponents = [
        <AddItemForm key={0} />,
        // <AdminOrdersTable key={1} />,
    ];
    return (
        <div className="admin-dashboard">
            <Tabs tabs={['Add Item', 'Orders']} onTabChange={handleTabChange} />
            {tabComponents[activeTab]}
        </div>
    );
}

export default AdminDashboard