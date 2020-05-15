import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { MOLLIE_MODULE_OPTIONS } from "./constants";
import { MollieAsyncOptions, MollieOptions, MollieOptionsFactory } from "./options";
import { createMollieProviders } from "./providers";
import { MollieService } from "./service";

@Global()
@Module({
  providers: [MollieService],
  exports: [MollieService],
})
export class MollieModule {
  /**
   * Registers a configured MollieModule for import into the current module
   */
  public static register(options: MollieOptions): DynamicModule {
    return {
      module: MollieModule,
      providers: createMollieProviders(options),
    };
  }

  /**
   * Registers a configured MollieModule for import into the current module using dynamic options (factory, etc)
   */
  public static registerAsync(options: MollieAsyncOptions): DynamicModule {
    return {
      module: MollieModule,
      imports: options.imports || [],
      providers: [
        ...this.createProviders(options),
      ],
    };
  }

  private static createProviders(options: MollieAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(options: MollieAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MOLLIE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: MOLLIE_MODULE_OPTIONS,
      useFactory: async (factory: MollieOptionsFactory) => await factory.createMollieOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
