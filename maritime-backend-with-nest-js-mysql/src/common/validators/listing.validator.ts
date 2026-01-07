import { CONTRABAND_KEYWORDS, RESTRICTED_REGIONS } from "../constants"

export class ListingValidator {
  static checkForContraband(title: string, description: string): boolean {
    const combinedText = `${title} ${description}`.toLowerCase()
    return CONTRABAND_KEYWORDS.some((keyword) => combinedText.includes(keyword))
  }

  static checkForRestrictedRegion(origin: string, destination: string): boolean {
    const combinedPorts = `${origin} ${destination}`.toLowerCase()
    return RESTRICTED_REGIONS.some((region) => combinedPorts.includes(region))
  }

  static validatePorts(origin: string, destination: string): boolean {
    // Basic validation - origin and destination should not be the same
    return origin.toLowerCase() !== destination.toLowerCase()
  }

  static validateCargo(title: string, price: number): boolean {
    if (!title || title.length < 5) return false
    if (price <= 0) return false
    return true
  }
}
