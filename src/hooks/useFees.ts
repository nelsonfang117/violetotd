export const useFees = () => {
    // These could later be moved to environment variables or context
    const dealerMarkup = 0;
    const taxRate = 1.103;
    const docFee = 200;
    const licenseTab = 750;
    
    const calculateOTD = (price: number) => {
        return Math.round((price + dealerMarkup) * taxRate + docFee + licenseTab);
    };

    return {
        dealerMarkup,
        taxRate,
        docFee,
        licenseTab,
        calculateOTD
    };
};