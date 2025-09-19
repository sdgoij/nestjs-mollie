import { MollieOptions as Options } from "@mollie/api-client";
import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export interface MollieAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => Promise<MollieOptions> | MollieOptions;
  useExisting?: Type<MollieOptionsFactory>;
  useClass?: Type<MollieOptionsFactory>;
  inject?: any[];
}

export interface MollieOptionsFactory {
  createMollieOptions(): Promise<MollieOptions> | MollieOptions;
}

export type MollieOptions = Options;
