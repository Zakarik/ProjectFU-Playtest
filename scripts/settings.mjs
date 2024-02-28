import {MODULE} from "./constants.mjs";

export const SETTINGS = {
    classes: {
        esper: "classes.esper",
        mutant: "classes.mutant",
        pilot: "classes.pilot",
    }
}

export function registerClassSettings() {
    game.settings.register(MODULE, SETTINGS.classes.esper, {
        name: game.i18n.localize("FU-PT.classes.esper.name"),
        hint: game.i18n.localize("FU-PT.classes.esper.hint"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    })

    game.settings.register(MODULE, SETTINGS.classes.mutant, {
        name: game.i18n.localize("FU-PT.classes.mutant.name"),
        hint: game.i18n.localize("FU-PT.classes.mutant.hint"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    })

    game.settings.register(MODULE, SETTINGS.classes.pilot, {
        name: game.i18n.localize("FU-PT.classes.pilot.name"),
        hint: game.i18n.localize("FU-PT.classes.pilot.hint"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    })
}