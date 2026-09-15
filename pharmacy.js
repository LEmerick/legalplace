export const DrugType = {
    HerbalTea: "Herbal Tea",
    Fervex: "Fervex",
    MagicPill: "Magic Pill",
    Dafalgan: "Dafalgan",
    NormalDrug: "Normal Drug",
    Doliprane: "Doliprane",
};

export class Drug {
    constructor(name, expiresIn, benefit) {
        this.name = name;
        this.expiresIn = expiresIn;
        this.benefit = benefit;
    }
}

const STRATEGIES = {
    [DrugType.MagicPill]: (drug) => {},
    [DrugType.HerbalTea]: (drug) => {
        drug.benefit += drug.expiresIn <= 0 ? 2 : 1;
        drug.expiresIn -= 1;
    },
    [DrugType.Fervex]: (drug) => {
        if (drug.expiresIn <= 0) {
            drug.benefit = 0;
        } else {
            drug.benefit += 1;
            if (drug.expiresIn <= 10) drug.benefit += 1;
            if (drug.expiresIn <= 5) drug.benefit += 1;
        }
        drug.expiresIn -= 1;
    },
    [DrugType.Dafalgan]: (drug) => {
        drug.benefit -= drug.expiresIn <= 0 ? 4 : 2;
        drug.expiresIn -= 1;
    },
};
function defaultStrategy(drug) {
    drug.benefit -= drug.expiresIn <= 0 ? 2 : 1;
    drug.expiresIn -= 1;
}

function getUpdateStrategy(name) {
    return STRATEGIES[name] || defaultStrategy;
}
export class Pharmacy {
    constructor(drugs = []) {
        this.drugs = drugs;
    }

    updateBenefitValue() {
        for (var i = 0; i < this.drugs.length; i++) {
            const currentDrug = this.drugs[i];
            const updateFunc = getUpdateStrategy(currentDrug.name);
            updateFunc(currentDrug);
            currentDrug.benefit = Math.min(
                Math.max(currentDrug.benefit, 0),
                50,
            );
        }
        return this.drugs;
    }
}
