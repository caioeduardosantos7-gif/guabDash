export class StringUtils {
  private constructor() {}

  /**
   * Formats a number as Brazilian currency (e.g. 1234.5 → "1.234,50").
   */
  static formatBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  /**
   * Formats a number as a simple decimal string using comma separator (e.g. 9.90 → "9,90").
   * Use when the "R$" prefix is rendered separately in the template.
   */
  static formatCurrency(value: number): string {
    return value.toFixed(2).replace('.', ',')
  }
}
