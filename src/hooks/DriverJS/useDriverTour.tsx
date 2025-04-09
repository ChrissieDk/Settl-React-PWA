import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useDriverTour = (
  isMobile: boolean,
  setIsSidebarOpen: (isOpen: boolean) => void,
  userIsMerchant: boolean
) => {
  const driverRef = useRef<any>(null);

  useEffect(() => {
    const tourCompleted = localStorage.getItem("tourCompleted");

    // ✅ Exit early if user is a merchant or tour is already completed
    if (userIsMerchant || tourCompleted) {
      return;
    }

    if (isMobile) {
      setIsSidebarOpen(true);
    }

    driverRef.current = driver({
      animate: true,
      allowClose: false,
      doneBtnText: "Finish",
      nextBtnText: "Next",
      prevBtnText: "Back",
      steps: [
        {
          element: "aside",
          popover: {
            title: "Navigation Sidebar",
            description:
              "This is your main navigation area where you can access all dashboard features.",
            side: "right",
          },
        },
        {
          element: '[data-driver="sidebar-add-card"]',
          popover: {
            title: "Add Payment Card",
            description:
              "Securely add a new payment card to your account to start your journey towards simpler healthcare. You may add multiple cards and select your preferred one.",
            side: "right",
          },
        },
        {
          element: '[data-driver="sidebar-nav-load"]',
          popover: {
            title: "Load Health Vault",
            description:
              "Top up your account by adding funds here. Simply enter the amount you wish to load and select a card from the drop-down menu. All saved cards will be displayed.",
            side: "right",
          },
        },
        {
          element: '[data-driver="sidebar-nav-redeem"]',
          popover: {
            title: "Redeem Vouchers",
            description:
              "Use your healthcare vouchers to pay for medical services and products.",
            side: "right",
          },
        },
        {
          element: '[data-driver="sidebar-nav-vouchers"]',
          popover: {
            title: "View Vouchers",
            description: "Access all your healthcare vouchers in one place.",
            side: "right",
          },
        },
        {
          element: '[data-driver="sidebar-nav-healthVault"]',
          popover: {
            title: "Health Vault",
            description:
              "Monitor your medical expenses and check your account balance.",
            side: "right",
          },
        },
        {
          element: '[data-driver="sidebar-nav-transactions"]',
          popover: {
            title: "Transaction History",
            description:
              "Review a detailed record of all your payments and voucher redemptions.",
            side: "right",
          },
        },
        // {
        //   element: '[data-driver="sidebar-actions"]',
        //   popover: {
        //     title: "Quick Actions",
        //     description: "Perform key account actions quickly and efficiently.",
        //     side: "right",
        //   },
        // },
        {
          element: '[data-driver="sidebar-my-cards"]',
          popover: {
            title: "Manage Cards",
            description: "View, add and manage your saved payment cards.",
            side: "right",
          },
        },
        {
          element: ".flex-1.p-4.overflow-auto",
          popover: {
            title: "Content Area",
            description:
              "This section displays detailed information based on your selected option.",
            side: "left",
          },
        },
      ],
      onDestroyed: () => {
        localStorage.setItem("tourCompleted", "true");
      },
    });

    driverRef.current.drive();
  }, [isMobile, setIsSidebarOpen, userIsMerchant]);
};
