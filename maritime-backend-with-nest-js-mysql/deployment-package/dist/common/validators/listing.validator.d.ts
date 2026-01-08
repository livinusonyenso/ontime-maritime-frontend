export declare class ListingValidator {
    static checkForContraband(title: string, description: string): boolean;
    static checkForRestrictedRegion(origin: string, destination: string): boolean;
    static validatePorts(origin: string, destination: string): boolean;
    static validateCargo(title: string, price: number): boolean;
}
