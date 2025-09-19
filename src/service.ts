import createMollieClient, { MollieClient } from "@mollie/api-client";
import { Inject, Injectable } from "@nestjs/common";
import { MOLLIE_MODULE_OPTIONS } from "./constants";
import { MollieOptions } from "./options";

type NonConflictingOverrides =
  | Partial<Omit<MollieOptions, "apiKey">>
  | Partial<Omit<MollieOptions, "accessToken">>;

@Injectable()
export class MollieService {
  constructor(@Inject(MOLLIE_MODULE_OPTIONS) private options: MollieOptions) {}

  createClient(options?: NonConflictingOverrides): MollieClient {
    return createMollieClient({
      ...this.options,
      ...(options || {}),
    } as MollieOptions);
  }
}
