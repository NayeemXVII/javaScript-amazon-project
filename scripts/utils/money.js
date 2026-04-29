export function priceCentsFix(priceCents) {
    return priceCents < 0 ? '0.00' : (Math.round(priceCents) / 100).toFixed(2);
};