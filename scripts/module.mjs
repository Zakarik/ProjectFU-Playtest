import {PsychicGiftDataModel} from "./features/esper/psychic-gift-data-model.mjs";
import {TherioformDataModel} from "./features/mutant/therioform-data-model.mjs";
import {ArmorModuleDataModel} from "./features/pilot/armor-module-data-model.mjs";
import {WeaponModuleDataModel} from "./features/pilot/weapon-module-data-model.mjs";
import {VehicleDataModel} from "./features/pilot/vehicle-data-model.mjs";
import {LOG_MESSAGE, MODULE} from "./constants.mjs";
import {VehicleManager} from "./features/pilot/vehicle-manager.mjs";
import {SupportModuleDataModel} from "./features/pilot/support-module-data-model.mjs";
import {registerClassSettings, SETTINGS} from "./settings.mjs";

export const registeredFeatures = {}

Hooks.once('init', async function () {
    console.log(LOG_MESSAGE, "Initialization started")

    console.log(LOG_MESSAGE, "Registering settings")
    registerClassSettings()

    console.log(LOG_MESSAGE, "Registering class features")
    const templates = {}

    if (game.settings.get(MODULE, SETTINGS.classes.esper)) {
        registeredFeatures.psychicGift = CONFIG.FU.classFeatureRegistry.register(MODULE, "psychicGift", PsychicGiftDataModel)

        Object.assign(templates, {
            "projectfu-playtest.psychicGift.sheet": "modules/projectfu-playtest/templates/esper/psychic-gift-sheet.hbs",
            "projectfu-playtest.psychicGift.preview": "modules/projectfu-playtest/templates/esper/psychic-gift-preview.hbs",
        })
    }

    if (game.settings.get(MODULE, SETTINGS.classes.mutant)) {
        registeredFeatures.therioform = CONFIG.FU.classFeatureRegistry.register(MODULE, "therioform", TherioformDataModel)

        Hooks.on("renderFUStandardActorSheet", TherioformDataModel.onRenderStandardFUActorSheet)

        Object.assign(templates, {
            "projectfu-playtest.therioform.sheet": "modules/projectfu-playtest/templates/mutant/therioform-sheet.hbs",
        })
    }

    if (game.settings.get(MODULE, SETTINGS.classes.pilot)) {
        registeredFeatures.vehicle = CONFIG.FU.classFeatureRegistry.register(MODULE, "vehicle", VehicleDataModel)
        registeredFeatures.armorModule = CONFIG.FU.classFeatureRegistry.register(MODULE, "armorModule", ArmorModuleDataModel)
        registeredFeatures.weaponModule = CONFIG.FU.classFeatureRegistry.register(MODULE, "weaponModule", WeaponModuleDataModel)
        registeredFeatures.supportModule = CONFIG.FU.classFeatureRegistry.register(MODULE, "supportModule", SupportModuleDataModel)

        Hooks.on("projectfu.actor.dataPrepared", VehicleManager.onActorPrepared)
        Hooks.on("renderFUStandardActorSheet", VehicleManager.onRenderStandardFUActorSheet)

        Object.assign(templates, {
            "projectfu-playtest.vehicle.sheet": "modules/projectfu-playtest/templates/pilot/vehicle-sheet.hbs",
            "projectfu-playtest.vehicle.preview": "modules/projectfu-playtest/templates/pilot/vehicle-preview.hbs",
            "projectfu-playtest.armorModule.sheet": "modules/projectfu-playtest/templates/pilot/armor-module-sheet.hbs",
            "projectfu-playtest.armorModule.preview": "modules/projectfu-playtest/templates/pilot/armor-module-preview.hbs",
            "projectfu-playtest.weaponModule.sheet": "modules/projectfu-playtest/templates/pilot/weapon-module-sheet.hbs",
            "projectfu-playtest.weaponModule.preview": "modules/projectfu-playtest/templates/pilot/weapon-module-preview.hbs",
            "projectfu-playtest.supportModule.sheet": "modules/projectfu-playtest/templates/pilot/support-module-sheet.hbs",
            "projectfu-playtest.supportModule.preview": "modules/projectfu-playtest/templates/pilot/support-module-preview.hbs",
        })
    }

    loadTemplates(templates)

    console.log(LOG_MESSAGE, "Class Features registered", registeredFeatures)

    console.log(LOG_MESSAGE, "Initialized")
});