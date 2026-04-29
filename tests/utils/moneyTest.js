import { priceCentsFix } from "../../scripts/utils/money.js";

describe('Test Suite: priceCentsFix', () => {
    it('convert cents into dollars', () => {
        expect(priceCentsFix(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(priceCentsFix(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cents', () => {
        expect(priceCentsFix(2000.5)).toEqual('20.01');
    });

    it('rounds down to the nearest cents', () => {
        expect(priceCentsFix(2000.4)).toEqual('20.00');
    });

    it('priceCentsFix Work Wit Negetive Numbers', () => {
        expect(priceCentsFix(-10)).toEqual('0.00');
    });
});