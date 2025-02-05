// src/hooks/useDriverTour.ts
import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useDriverTour = (
  isMobile: boolean,
  setIsSidebarOpen: (isOpen: boolean) => void
) => {
  const driverRef = useRef<any>(null);

  useEffect(() => {
    const tourCompleted = localStorage.getItem("tourCompleted");
    if (!tourCompleted) {
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
                "This is your main navigation area. All dashboard features are accessible from here.",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-add-card"]',
            popover: {
              title: "Add Payment Card",
              description:
                "Step 1 : Securely add new card to your account to start your journey to simpler healthcare. You can add more than one card and choose your preferred one.",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-nav-load"]',
            popover: {
              title: "Load Health Vault",
              description:
                "Step 2 : Add funds to your account here. Simply add the amount you wish to load and select a card from the dropdown. All cards will be displayed here",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-nav-redeem"]',
            popover: {
              title: "Redeem Vouchers",
              description:
                "Step 3 : Redeem your healthcare vouchers for medical services and products.",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-nav-vouchers"]',
            popover: {
              title: "View Vouchers",
              description: "View all your healthcare vouchers in one place.",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-nav-healthVault"]',
            popover: {
              title: "Health Vault",
              description:
                "Track your medical expenses and view your account balances.",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-nav-transactions"]',
            popover: {
              title: "Transaction History",
              description:
                "View all your payment and redemption transactions with detailed records.",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-actions"]',
            popover: {
              title: "Quick Actions",
              description:
                "Perform essential account actions quickly from here.",
              side: "right",
            },
          },
          {
            element: '[data-driver="sidebar-my-cards"]',
            popover: {
              title: "Manage Cards",
              description: "View and manage your saved cards.",
              side: "right",
            },
          },
          {
            element: ".flex-1.p-4.overflow-auto",
            popover: {
              title: "Content Area",
              description:
                "This area displays detailed information based on your selected section.",
              side: "left",
            },
          },
        ],
        onDestroyed: () => {
          localStorage.setItem("tourCompleted", "true");
        },
      });

      driverRef.current.drive();
    }
  }, [isMobile, setIsSidebarOpen]);
};
