import { MOLLIE_MODULE_OPTIONS } from "./constants";
import { MollieOptions } from "./options";

export function createMollieProviders(options: MollieOptions) {
  return [
    {
      provide: MOLLIE_MODULE_OPTIONS,
      useValue: options,
    },
  ];
}
