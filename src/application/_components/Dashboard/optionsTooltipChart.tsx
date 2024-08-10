import { EOfferStatus, EOrderStatus, EReportStatus, EStatusUser, ETypeOffer, TYPE_ASSETS } from "@/utils/common";

export const options = {
  responsive: true,
  fill: false,
  radius: 0,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawOnChartArea: false,
        drawBorder: false,
      },
    },
    y: {
      border: { dash: [4, 4] },
      grid: {
        tickBorderDash: [2, 3],
        drawTicks: true,
        drawOnChartArea: true,
      },

      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      titleAlign: "center",
      mode: "index",
      intersect: false,
      boxWidth: 10,
      padding: 8,
      boxHeight: 2,
      boxPadding: 8,
      bodySpacing: 8,
      cornerRadius: 16,
      callbacks: {
        title: (value: any) => {
          return "";
        },
        label: (tooltipItem: any) => {
          if (
            tooltipItem?.dataset?.typeChart === EOfferStatus?.FILLED ||
            tooltipItem?.dataset?.typeChart === EOrderStatus?.PURCHASE_COMPLETED
          ) {
            return `Success ${tooltipItem?.formattedValue}`;
          }
          if (tooltipItem?.dataset?.typeChart === EOfferStatus?.INACTIVE) {
            return `Delisted ${tooltipItem?.formattedValue}`;
          }
          if (tooltipItem?.dataset?.typeChart === EOfferStatus?.CANCELLED) {
            return `Cancelled ${tooltipItem?.formattedValue}`;
          }
          if (tooltipItem?.dataset?.typeChart === EOfferStatus?.ACTIVE) {
            return `Listing ${tooltipItem?.formattedValue}`;
          }
          if (tooltipItem?.dataset?.typeChartUser === EStatusUser?.ACTIVE) {
            return `Active ${tooltipItem?.formattedValue}`;
          }
          if (tooltipItem?.dataset?.typeChartUser === EStatusUser?.SUSPENDED) {
            return `Suspended ${tooltipItem?.formattedValue}`;
          }
          if (tooltipItem?.dataset?.typeChart === EReportStatus?.IN_PROGRESS) {
            return `In Progress: ${tooltipItem?.formattedValue}`;
          }
          if (tooltipItem?.dataset?.typeChart === EReportStatus?.RESOLVED) {
            return `Resolved: ${tooltipItem?.formattedValue}`;
          }
        },
      },
    },
  },
};
export const optionsTypes = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      titleAlign: "center",
      padding: 8,
      boxPadding: 8,
      bodySpacing: 8,
      displayColors: false,
      callbacks: {
        title: (value: any) => {
          return "";
        },

        label: (tooltipItem: any) => {
          if (tooltipItem?.label === ETypeOffer?.ON_SELL) {
            return `On Sell: ${tooltipItem?.parsed}%`;
          }
          if (tooltipItem?.label === ETypeOffer?.AUCTION) {
            return `On Auction: ${tooltipItem?.parsed}%`;
          }
          if (tooltipItem?.label === TYPE_ASSETS?.DOMAIN) {
            return `Domain: ${tooltipItem?.parsed}%`;
          }
          if (tooltipItem?.label === TYPE_ASSETS?.TELEGRAM_HANDLE) {
            return `Telegram Handle: ${tooltipItem?.parsed}%`;
          }
        },
      },
    },
  },
};
