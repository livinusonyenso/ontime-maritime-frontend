module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/ONTIME project/contexts/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for stored user session
        const storedUser = localStorage.getItem("ontime_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const login = async (email, password)=>{
        // Dummy login logic
        const dummyUser = {
            id: "1",
            email,
            name: email.split("@")[0],
            role: email.includes("admin") ? "admin" : "user"
        };
        setUser(dummyUser);
        localStorage.setItem("ontime_user", JSON.stringify(dummyUser));
    };
    const register = async (email, password, name)=>{
        // Dummy register logic
        const dummyUser = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            role: "user"
        };
        setUser(dummyUser);
        localStorage.setItem("ontime_user", JSON.stringify(dummyUser));
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("ontime_user");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated: !!user,
            login,
            logout,
            register
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/ONTIME project/contexts/auth-context.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[project]/Downloads/ONTIME project/contexts/tracking-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackingProvider",
    ()=>TrackingProvider,
    "useTracking",
    ()=>useTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const TrackingContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Dummy shipment data
const dummyShipments = [
    {
        id: "1",
        trackingNumber: "OM-2024-001",
        origin: "Shanghai, China",
        destination: "Los Angeles, USA",
        status: "in-transit",
        vessel: "MSC Gulsun",
        departureDate: "2024-01-15",
        estimatedArrival: "2024-02-05",
        currentLocation: "Pacific Ocean",
        progress: 65
    },
    {
        id: "2",
        trackingNumber: "OM-2024-002",
        origin: "Rotterdam, Netherlands",
        destination: "Lagos, Nigeria",
        status: "customs",
        vessel: "Ever Given",
        departureDate: "2024-01-20",
        estimatedArrival: "2024-02-10",
        currentLocation: "Lagos Port",
        progress: 95
    }
];
function TrackingProvider({ children }) {
    const [shipments, setShipments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(dummyShipments);
    const searchShipment = (trackingNumber)=>{
        return shipments.find((s)=>s.trackingNumber.toLowerCase().includes(trackingNumber.toLowerCase()));
    };
    const addShipment = (shipment)=>{
        setShipments((prev)=>[
                ...prev,
                shipment
            ]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackingContext.Provider, {
        value: {
            shipments,
            searchShipment,
            addShipment
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/ONTIME project/contexts/tracking-context.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function useTracking() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TrackingContext);
    if (context === undefined) {
        throw new Error("useTracking must be used within a TrackingProvider");
    }
    return context;
}
}),
"[project]/Downloads/ONTIME project/contexts/auction-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuctionProvider",
    ()=>AuctionProvider,
    "useAuction",
    ()=>useAuction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AuctionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Dummy auction data
const dummyAuctions = [
    {
        id: "1",
        title: "Container Slot - Shanghai to LA",
        description: "20ft container slot on premium vessel",
        vessel: "MSC Gulsun",
        route: "Shanghai → Los Angeles",
        cargo: "General Cargo",
        capacity: "20ft Container",
        currentBid: 2500,
        minimumBid: 2000,
        endTime: "2024-02-15T23:59:59",
        bidders: 8,
        image: "/cargo-ship-at-sea.jpg"
    },
    {
        id: "2",
        title: "Bulk Cargo Charter - Rotterdam to Lagos",
        description: "Full vessel charter for bulk cargo",
        vessel: "Ever Given",
        route: "Rotterdam → Lagos",
        cargo: "Bulk Cargo",
        capacity: "50,000 MT",
        currentBid: 125000,
        minimumBid: 100000,
        endTime: "2024-02-20T23:59:59",
        bidders: 5,
        image: "https://plus.unsplash.com/premium_photo-1661879449050-069f67e200bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naXN0aWN8ZW58MHx8MHx8fDA%3D"
    }
];
function AuctionProvider({ children }) {
    const [auctions, setAuctions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(dummyAuctions);
    const placeBid = (auctionId, amount)=>{
        setAuctions((prev)=>prev.map((auction)=>auction.id === auctionId ? {
                    ...auction,
                    currentBid: amount,
                    bidders: auction.bidders + 1
                } : auction));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuctionContext.Provider, {
        value: {
            auctions,
            placeBid
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/ONTIME project/contexts/auction-context.tsx",
        lineNumber: 72,
        columnNumber: 10
    }, this);
}
function useAuction() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuctionContext);
    if (context === undefined) {
        throw new Error("useAuction must be used within an AuctionProvider");
    }
    return context;
}
}),
"[project]/Downloads/ONTIME project/contexts/document-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentProvider",
    ()=>DocumentProvider,
    "useDocument",
    ()=>useDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DocumentContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Dummy documents
const dummyDocuments = [
    {
        id: "1",
        title: "Bill of Lading - OM-2024-001",
        type: "bill-of-lading",
        shipmentId: "1",
        uploadDate: "2024-01-15",
        status: "approved",
        fileUrl: "#"
    },
    {
        id: "2",
        title: "Commercial Invoice - OM-2024-001",
        type: "invoice",
        shipmentId: "1",
        uploadDate: "2024-01-15",
        status: "approved",
        fileUrl: "#"
    }
];
function DocumentProvider({ children }) {
    const [documents, setDocuments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(dummyDocuments);
    const uploadDocument = (doc)=>{
        const newDoc = {
            ...doc,
            id: Math.random().toString(36).substr(2, 9)
        };
        setDocuments((prev)=>[
                ...prev,
                newDoc
            ]);
    };
    const getDocumentsByShipment = (shipmentId)=>{
        return documents.filter((doc)=>doc.shipmentId === shipmentId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DocumentContext.Provider, {
        value: {
            documents,
            uploadDocument,
            getDocumentsByShipment
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/ONTIME project/contexts/document-context.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function useDocument() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DocumentContext);
    if (context === undefined) {
        throw new Error("useDocument must be used within a DocumentProvider");
    }
    return context;
}
}),
"[project]/Downloads/ONTIME project/contexts/notification-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationProvider",
    ()=>NotificationProvider,
    "useNotification",
    ()=>useNotification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const NotificationContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Dummy notifications
const dummyNotifications = [
    {
        id: "1",
        title: "Shipment Update",
        message: "Your shipment OM-2024-001 has cleared customs",
        type: "success",
        timestamp: new Date().toISOString(),
        read: false
    },
    {
        id: "2",
        title: "Auction Ending Soon",
        message: "Container Slot - Shanghai to LA auction ends in 2 hours",
        type: "warning",
        timestamp: new Date().toISOString(),
        read: false
    }
];
function NotificationProvider({ children }) {
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(dummyNotifications);
    const addNotification = (notif)=>{
        const newNotif = {
            ...notif,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            read: false
        };
        setNotifications((prev)=>[
                newNotif,
                ...prev
            ]);
    };
    const markAsRead = (id)=>{
        setNotifications((prev)=>prev.map((notif)=>notif.id === id ? {
                    ...notif,
                    read: true
                } : notif));
    };
    const unreadCount = notifications.filter((n)=>!n.read).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationContext.Provider, {
        value: {
            notifications,
            addNotification,
            markAsRead,
            unreadCount
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/ONTIME project/contexts/notification-context.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
function useNotification() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
}
}),
"[project]/Downloads/ONTIME project/components/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/contexts/auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$tracking$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/contexts/tracking-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$auction$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/contexts/auction-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$document$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/contexts/document-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$notification$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/contexts/notification-context.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$tracking$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$auction$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuctionProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$document$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$contexts$2f$notification$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NotificationProvider"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Downloads/ONTIME project/components/providers.tsx",
                        lineNumber: 16,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/ONTIME project/components/providers.tsx",
                    lineNumber: 15,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/ONTIME project/components/providers.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/ONTIME project/components/providers.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/ONTIME project/components/providers.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/ONTIME project/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$components$2f$providers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/ONTIME project/components/providers.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function AppProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$ONTIME__project$2f$components$2f$providers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Providers"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/ONTIME project/app/providers.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d5e8ab47._.js.map