import { Drug, Pharmacy, DrugType } from "./pharmacy";

describe("Pharmacy", () => {
    it("should decrease the benefit and expiresIn", () => {
        const testD = new Drug("test", 2, 3);
        expect(new Pharmacy([testD]).updateBenefitValueOld()).toEqual([
            new Drug("test", 1, 2),
        ]);
    });

    for (const t of [
        DrugType.NormalDrug,
        DrugType.Fervex,
        DrugType.HerbalTea,
        DrugType.MagicPill,
    ]) {
        //Object.keys(DrugType)) {
        it(`test new method vs old method for ${t}`, () => {
            const testD = new Drug(t, 15, 3);
            const testDrug = Pharmacy.createDrugFactory(t, 15, 3);

            const pharmacy = new Pharmacy([testD]);
            const pharmacy2 = new Pharmacy([testDrug]);

            for (let days = 0; days < 30; days++) {
                const oldMethodResult = pharmacy.updateBenefitValueOld();
                const newMethodResult = pharmacy2.updateBenefitValue();
                expect(newMethodResult[0]).toEqual(oldMethodResult[0]);
            }
        });
    }
    /** test dafalgan */
    it("degrades in Benefit twice as fast as normal drugs", () => {
        const start = 2;
        const normalDrug = Pharmacy.createDrugFactory(
            DrugType.NormalDrug,
            15,
            start,
        );
        const dafalgan = Pharmacy.createDrugFactory(
            DrugType.Dafalgan,
            normalDrug.expiresIn,
            start,
        );
        const pharmacy = new Pharmacy([normalDrug, dafalgan]);

        // dafa
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
});
