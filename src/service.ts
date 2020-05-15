import createMollieClient, { MollieClient } from "@mollie/api-client";
import { Inject, Injectable } from "@nestjs/common";
import { MOLLIE_MODULE_OPTIONS } from "./constants";
import { MollieOptions } from "./options";

@Injectable()
export class MollieService {
  constructor(@Inject(MOLLIE_MODULE_OPTIONS) private options: MollieOptions) {}

  createClient(options?: MollieOptions): MollieClient {
    return createMollieClient({ ...this.options,  ...(options || {}) });
  }
}
