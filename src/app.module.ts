import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
// Los modulos agrupan y desacoplan un conjunto
// de funcionalidades especifica por dominio.
// Ej: auth.module.ts, encargado de todo lo realacionado
// a la autenticacion

@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
