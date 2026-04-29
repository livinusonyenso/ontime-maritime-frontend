"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingValidator = void 0;
const constants_1 = require("../constants");
class ListingValidator {
    static checkForContraband(title, description) {
        const combinedText = `${title} ${description}`.toLowerCase();
        return constants_1.CONTRABAND_KEYWORDS.some((keyword) => combinedText.includes(keyword));
    }
    static checkForRestrictedRegion(origin, destination) {
        const combinedPorts = `${origin} ${destination}`.toLowerCase();
        return constants_1.RESTRICTED_REGIONS.some((region) => combinedPorts.includes(region));
    }
    static validatePorts(origin, destination) {
        return origin.toLowerCase() !== destination.toLowerCase();
    }
    static validateCargo(title, price) {
        if (!title || title.length < 5)
            return false;
        if (price <= 0)
            return false;
        return true;
    }
}
exports.ListingValidator = ListingValidator;
//# sourceMappingURL=listing.validator.js.map