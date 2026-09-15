export const DrugType = {
    HerbalTea: "Herbal Tea",
    Fervex: "Fervex",
    MagicPill: "Magic Pill",
    Dafalgan: "Dafalgan",
    NormalDrug: "Normal Drug",
};

export class Drug {
    constructor(name, expiresIn, benefit) {
        this.name = name;
        this.expiresIn = expiresIn;
        this.benefit = benefit;
    }

    /**
     * @virtual
     */
    update() {
        this.expiresIn = this.expiresIn - 1;
        if (this.benefit > 50) {
            this.benefit = 50;
        } else if (this.benefit <= 0) {
            this.benefit = 0;
        } else if (this.expiresIn < 0) {
            this.benefit = 0;
        } else {
            this.benefit = this.benefit - 1;
        }

        return this;
    }
}

class HerbalTea extends Drug {
    constructor(expiresIn, benefit) {
        super(DrugType.HerbalTea, expiresIn, benefit);
    }
    update() {
        if (this.benefit < 50) {
            this.benefit = this.benefit + 1;
        }
        this.expiresIn = this.expiresIn - 1;

        if (this.expiresIn < 0) {
            if (this.benefit < 50) {
                this.benefit = this.benefit + 1;
            }
        }

        return this;
    }
}
class Fervex extends Drug {
    constructor(expiresIn, benefit) {
        super(DrugType.Fervex, expiresIn, benefit);
    }
    update() {
        if (this.benefit < 50) {
            this.benefit = this.benefit + 1;
            if (this.expiresIn < 11) {
                this.benefit = this.benefit + 1;
            }
            if (this.expiresIn < 6) {
                this.benefit = this.benefit + 1;
            }
        }
        this.expiresIn = this.expiresIn - 1;

        if (this.expiresIn < 0) {
            this.benefit = this.benefit - this.benefit;
        }

        return this;
    }
}
class MagicPill extends Drug {
    constructor(expiresIn, benefit) {
        super(DrugType.MagicPill, expiresIn, benefit);
    }

    update() {
        return this;
    }
}
class Dafalgan extends Drug {
    constructor(expiresIn, benefit) {
        super(DrugType.Dafalgan, expiresIn, benefit);
    }

    update() {
        this.benefit = this.benefit - 1;
        return super.update();
    }
}

export class Pharmacy {
    constructor(drugs = []) {
        this.drugs = drugs;
    }

    /**
     *
     * @param {keyof DrugType} name
     * @param {*} expiresIn
     * @param {*} benefit
     * @returns
     */
    static createDrugFactory(name, expiresIn, benefit) {
        switch (name) {
            case DrugType.HerbalTea:
                return new HerbalTea(expiresIn, benefit);
            case DrugType.Fervex:
                return new Fervex(expiresIn, benefit);
            case DrugType.MagicPill:
                return new MagicPill(expiresIn, benefit);
            case DrugType.Dafalgan:
                return new Dafalgan(expiresIn, benefit);
        }
        return new Drug(name, expiresIn, benefit);
    }

    updateBenefitValue() {
        for (var i = 0; i < this.drugs.length; i++) {
            const currentDrug = this.drugs[i];
            currentDrug.update();
        }
        return this.drugs;
    }

    /** @deprecated */
    updateBenefitValueOld() {
        for (var i = 0; i < this.drugs.length; i++) {
            const currentDrug = this.drugs[i];
            if (
                currentDrug.name != DrugType.HerbalTea &&
                currentDrug.name != DrugType.Fervex
            ) {
                if (currentDrug.benefit > 0) {
                    if (currentDrug.name != DrugType.MagicPill) {
                        currentDrug.benefit = currentDrug.benefit - 1;
                    }
                }
            } else {
                if (currentDrug.benefit < 50) {
                    currentDrug.benefit = currentDrug.benefit + 1;
                    if (currentDrug.name == DrugType.Fervex) {
                        if (currentDrug.expiresIn < 11) {
                            if (currentDrug.benefit < 50) {
                                currentDrug.benefit = currentDrug.benefit + 1;
                            }
                        }
                        if (currentDrug.expiresIn < 6) {
                            if (currentDrug.benefit < 50) {
                                currentDrug.benefit = currentDrug.benefit + 1;
                            }
                        }
                    }
                }
            }
            if (currentDrug.name != DrugType.MagicPill) {
                currentDrug.expiresIn = currentDrug.expiresIn - 1;
            }
            if (currentDrug.expiresIn < 0) {
                if (currentDrug.name != DrugType.HerbalTea) {
                    if (currentDrug.name != DrugType.Fervex) {
                        if (currentDrug.benefit > 0) {
                            if (currentDrug.name != DrugType.MagicPill) {
                                currentDrug.benefit = currentDrug.benefit - 1;
                            }
                        }
                    } else {
                        currentDrug.benefit =
                            currentDrug.benefit - currentDrug.benefit;
                    }
                } else {
                    if (currentDrug.benefit < 50) {
                        currentDrug.benefit = currentDrug.benefit + 1;
                    }
                }
            }
        }

        return this.drugs;
    }
}
