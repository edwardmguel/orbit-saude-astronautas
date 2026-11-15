import type { Alerta } from "../../domain/tipos";
import type { ContextoCruzamento } from "./comum";
import { avaliarRCo201 } from "./rCo201";
import { avaliarRHid01 } from "./rHid01";
import { avaliarRRad01 } from "./rRad01";
import { avaliarRSans01 } from "./rSans01";
import { avaliarRSono01 } from "./rSono01";

export { criarContexto, sintomasRelatados, type ContextoCruzamento } from "./comum";
export { avaliarRCo201, ID_R_CO2_01 } from "./rCo201";
export { avaliarRRad01, ID_R_RAD_01 } from "./rRad01";
export { avaliarRSans01, ID_R_SANS_01 } from "./rSans01";
export { avaliarRSono01, ID_R_SONO_01 } from "./rSono01";
export { avaliarRHid01, ID_R_HID_01 } from "./rHid01";
export { avaliarRAmb01, moduloMaisOcupado, GRANDEZAS_POR_SINTOMA, ID_R_AMB_01, type EstadosParaAmbiente } from "./rAmb01";

/**
 * Roda as cinco regras que dependem só de leituras, autoavaliações e plano da missão. A R-AMB-01 fica
 * de fora porque lê os estados dos indicadores; `avaliarMissao` a chama depois.
 */
export function avaliarCruzamentos(ctx: ContextoCruzamento): Alerta[] {
  const alertas: Alerta[] = [];
  const global = avaliarRRad01(ctx);
  if (global) alertas.push(global);
  for (const tripulante of ctx.entrada.tripulantes) {
    for (const regra of [avaliarRCo201, avaliarRSans01, avaliarRSono01, avaliarRHid01]) {
      const alerta = regra(ctx, tripulante);
      if (alerta) alertas.push(alerta);
    }
  }
  return alertas;
}
