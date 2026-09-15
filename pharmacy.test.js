import { Drug, Pharmacy, DrugType } from "./pharmacy";

describe("Pharmacy", () => {
    it("should decrease the benefit and expiresIn", () => {
        const testD = new Drug("test", 2, 3);
        expect(new Pharmacy([testD]).updateBenefitValue()).toEqual([
            new Drug("test", 1, 2),
        ]);
    });

    it("Dafalgan degrades in Benefit twice as fast as normal drugs", () => {
        const start = 2;
        const normalDrug = new Drug(DrugType.NormalDrug, 15, start);
        const dafalgan = new Drug(DrugType.Dafalgan, 15, start);
        const pharmacy = new Pharmacy([normalDrug, dafalgan]);

        for (let days = 1; days < 30; days++) {
            pharmacy.updateBenefitValue();
            if (dafalgan.expiresIn > 0) {
                expect(dafalgan.benefit).toEqual(Math.max(0, start - days * 2));
            }
            if (normalDrug.expiresIn > 0) {
                expect(normalDrug.benefit).toEqual(Math.max(0, start - days));
            }
        }
    });

    for (const t of Object.values(DrugType)) {
        it(`Benefit never over 50  ${t} `, () => {
            const testD = new Drug(t, 20, 50);
            const pharmacy = new Pharmacy([testD]);
            for (let days = 0; days < 30; days++) {
                pharmacy.updateBenefitValue();
                expect(testD.benefit).toBeLessThanOrEqual(50);
            }
        });
    }
    for (const t of Object.values(DrugType)) {
        it(`Benefit never negative ${t} `, () => {
            const testD = new Drug(t, 20, 30);
            const pharmacy = new Pharmacy([testD]);
            for (let days = 0; days < 30; days++) {
                pharmacy.updateBenefitValue();
                expect(testD.benefit).toBeGreaterThanOrEqual(0);
            }
        });
    }

    it("Fervex benefit drops to 0 after expiration", () => {
        const testD = new Drug(DrugType.Fervex, 1, 15);
        const pharmacy = new Pharmacy([testD]);
        pharmacy.updateBenefitValue();
        expect(testD.benefit).toEqual(15 + 3);
        pharmacy.updateBenefitValue();
        expect(testD.benefit).toEqual(0);
    });
});
