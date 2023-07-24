export const SEGUNDO = 1000
export const MINUTO = SEGUNDO * 60
export const HORA = MINUTO * 60
export const DIA = HORA * 24
export const SEMANA = DIA * 7
export const MES30 = DIA * 30
export const MES31 = DIA * 31
export const MES28 = DIA * 28
export const MES29 = DIA * 29
export const ANIO = DIA * 365
export const ANIOBIS = DIA * 366

export const ZONA_HORARIA_MEXICO = 'America/Mexico_City'
export const ZONA_HORARIA_MEXICO_UTC = 'GMT-06:00'
export const LOCALES_MEXICO = 'en-MX'

export const NOMBRES_MESES = {
  1: { largo: 'enero', corto: 'ene' },
  2: { largo: 'febrero', corto: 'feb' },
  3: { largo: 'marzo', corto: 'mar' },
  4: { largo: 'abril', corto: 'abr' },
  5: { largo: 'mayo', corto: 'may' },
  6: { largo: 'junio', corto: 'jun' },
  7: { largo: 'julio', corto: 'jul' },
  8: { largo: 'agosto', corto: 'ago' },
  9: { largo: 'septiembre', corto: 'sep' },
  10: { largo: 'octubre', corto: 'oct' },
  11: { largo: 'noviembre', corto: 'nov' },
  12: { largo: 'diciembre', corto: 'dic' },
}
export const NOMBRES_DIAS = {
  1: { largo: 'domingo', corto: 'dom' },
  2: { largo: 'lunes', corto: 'lun' },
  3: { largo: 'martes', corto: 'mar' },
  4: { largo: 'miércoles', corto: 'mié' },
  5: { largo: 'jueves', corto: 'jue' },
  6: { largo: 'viernes', corto: 'vie' },
  7: { largo: 'sábado', corto: 'sáb' },
}


export class UtilesGenerales {
    constructor() {}

    particionarArreglo(arreglo: any[], tamParticiones: number) {
        if (tamParticiones <= 0) return [arreglo]
        let resultado = []
        for (let i = 0; i < arreglo.length; i += tamParticiones) {
          resultado[resultado.length] = arreglo.slice(i, i + tamParticiones)
        }
        return resultado
    }
    
    escaparCadenaDeTexto(cadena: string) {
        return cadena.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      }
    
    regexSeleccionarNoRepetidas(palabrasExistentes: string[], escapar = false) {
        let cadenaPalabrasAIgnorar = palabrasExistentes.join('|')
        let cadenaRegex = `^(?!(${cadenaPalabrasAIgnorar})$).*$`
        if (escapar) cadenaRegex = this.escaparCadenaDeTexto(cadenaRegex)
        return new RegExp(cadenaRegex, 'i')
        }

        /**
         * Procesa las palabras en camelcase poniendo espacioes entre cada
         * cambio:
         * ```
         * 'holaComoEstas unGustoConcerte' => 'hola Como Estas un Gusto Concerte'
         * ```
         * 
         * @param {string} [palabra] La cadena a procesar
         * @param {(x:string)=>{}} [callback] Callback para post-procesado. Recibe un argumento `string`.
         * @returns 
         */
        separarCamelcase(palabra: string, callback: any): string {
        if (callback !== null) return callback(palabra.replace(/[A-Z]/g, ' $&'))
        return palabra.replace(/[A-Z]/g, ' $&')
    }

    /**
     * Procesa las palabras en snakecase o dotcase poniendo espacioes entre cada
     * cambio:
     * ```
     * 'hola_como_estas' => 'hola como estas' 
     * 'hola.Como.Estas' => 'hola Como Estas' 
     * 'hola-como-estas' => 'hola como estas' 
     * ```
     * 
     * @param {string} [palabra] La cadena a procesar
     * @param {(x:string)=>{}} [callback] Callback para post-procesado. Recibe un argumento `string`.
     * @returns 
     */
    separarSnakeCaseDotCase(palabra: string, callback: any): string {
        if (callback !== null) return callback(palabra.replace(/[\._-]/g, ' '))
        return palabra.replace(/[\._-]/g, ' ')
        }

        rellenarCerosIzquierda(numero: any, largo: number) {
        let signo = ''
        try {
            numero = Number(numero)
            if (numero < 0) signo = '-'
            numero = Math.abs(numero)
        } catch { null }
        try {
            return signo + numero.toString().padStart(largo, '0')
        } catch {
            return this.rellenarCerosIzquierdaRecursivo(numero, largo)
        }
    }

    rellenarCerosIzquierdaRecursivo(numero: any, largo: number): string {
        return (numero.toString().length < largo)? this.rellenarCerosIzquierdaRecursivo('0' + numero, largo) : numero
    }
    
    obtenerDiasEnTotalDeUnMes(mes: number, year: number) {
        let entradasBinario = this.convertirBinarioABooleanos(
            this.convertirDecimalABaseDesde2A32(mes, 2, 4)
        )

        // (o-----------------------------------------( CONSTANTES PARA OPERACION LOGICA (BOOLEANA) ))
        const A = entradasBinario[0]
        const B = entradasBinario[1]
        const C = entradasBinario[2]
        const D = entradasBinario[3]
        
        // (o-----------------------------------------( OPERACION BOOLEANA ))

        // Esto puede retornar 1 de tres: 
        //     "00" Meses con 30 dias 
        //     "01" Meses con 31 dias
        //     "10" Caso especial de febrero
        const CANT_DIAS_BINARIO = [
            (!A && !B && C && !D),
            (A && !D) 
            || (B && D) 
            || (!C && !B && !A) 
            || (!C && !B && !D) 
            || (D && !A),
        ].join('')

        //     "00" > 0   Meses con 30 dias 
        //     "01" > 1   Meses con 31 dias
        //     "10" > 2   Caso especial de febrero
        const TIPO_MES = this.convertirCadenaANumeroBaseDesde2A32(CANT_DIAS_BINARIO, 2)

        if      (TIPO_MES === 0) return 30
        else if (TIPO_MES === 1) return 31
        else if (TIPO_MES === 2) {
            const YEAR_BISIESTO = year % 4 === 0
            if (YEAR_BISIESTO) return 29
            else return 28
        }

    }

    convertirDecimalABaseDesde2A32(numero: any, base: number, rellenoCeros: number) {
        let binStr = Number(numero).toString(base)
        return this.rellenarCerosIzquierda(binStr, rellenoCeros)
    }
    
    convertirCadenaANumeroBaseDesde2A32(numero: any, base: number) {
        return parseInt(numero.toString(), base)
    }
    
    convertirBinarioABooleanos(binarioCadena: string): boolean[] {
        return binarioCadena.split('').map(num => {
            if (Number(num) == 0) return false
            else return true
        })
    }

    convertir24ha12h(hora: number): [number, string] {
        let amOPm = hora > 11 ? 'p. m.' : 'a. m.'
        if (hora > 12) return [hora - 12, amOPm]
        else return [hora, amOPm]
    }

    convertir12ha24h(hora: number, amOPm: boolean): number {
        let esAm = amOPm
        if (esAm) {
            if (hora === 12) return 0
            else return hora
        }
        else return hora + 12
    }

    separarHorasMinutos(horas: number): [number, number] {    
        let horasEnMinutos = horas * 60
        let horasSolas = 0
        let minutosSolos = 0
        while (horasEnMinutos > 0) {
            if (horasEnMinutos > 59) {
            horasSolas++
            horasEnMinutos -= 60
            } else {
            minutosSolos = horasEnMinutos
            horasEnMinutos = 0
            }
        }

        return [horasSolas, minutosSolos]
    }

    separarHorasMinutosFormateado(horas: number): string {
        let separado =this.separarHorasMinutos(horas)
        let horasSolas = separado[0].toFixed(0)
        let minutosSolos = separado[1].toFixed(0)
        return `${horasSolas} Horas y ${minutosSolos} minutos`
    }

    // https://stackoverflow.com/a/19691491/13132076
    aumentarDiasAFecha(fecha: Date, diasAumento: number): Date {
        let fechaProcesada = new Date(fecha)
        fechaProcesada.setDate(fechaProcesada.getDate() + diasAumento)
        return fechaProcesada
    }


    /**
     * Este ejemplo de uso:
     * ```
     * trasladarArregloDeObjetosAObjetoDeObjetos(
     *  [{_id: 1, campo: any}, {_id: ab62, campo: any}, ...],
     *  '_id'
     * )
     * ```
     * Retorna esto:
     * ```
     * {'1': {_id: 1, campo: any}, 'ab62': {_id: ab62, campo: any}, ...}
     * ```
     *
     * El `campoContenedor`debe existir en al menos uno de los objetos
     * que se procesaran, de lo contrario se obtiene un objeto vacio;
     * Los objetos que no tengan el `campoContenedor` se descartaran
     * del resultado final.
     *
     * @param {{}[]} [arreglo] El arreglo que contiene los objetos
     * @param {string} [campoContenedor] El campo que contendrá cada objeto dentro del nuevo objeto
     * @returns {{[type: string]: any}} El objeto que contiene a los demas objetos.
     */
    convertirArregloObjetosAObjeto(
        arreglo: {[type: string]: any}[], 
        campoContenedor: string
    ) {
        if (!arreglo) return {}
        let objetoDeObjetos: {[type: string]: any} = {}
        arreglo.forEach(unObjeto => {
            let valorCampoContenedor: string = String(unObjeto[campoContenedor])
            if (valorCampoContenedor) {
                objetoDeObjetos[valorCampoContenedor.toString()] 
                    = unObjeto
            }
        })
        return objetoDeObjetos
    }

    seleccionarCampoCualquierNivel(
        objeto: any,
        campo: string,
        separador: string,
        campoSeleccionado: number = 0
    ): CampoObtenido {
        let ruta = campo.split(separador)
        let objetoActual: any
        let ultimoCampo: string = ''
        let primerCampo: string = ruta[0]
        objetoActual = objeto[primerCampo]
        for (let iRuta = 1; iRuta < ruta.length; iRuta++) {
            const pasoRuta = ruta[iRuta]
            objetoActual = objetoActual[pasoRuta]
            ultimoCampo = pasoRuta
        }

        let resultado: CampoObtenido = {
            valor: objetoActual,
            ultimoCampo: ultimoCampo,
            primerCampo: primerCampo,
            campoSeleccionado: ruta[campoSeleccionado]
        }

        return resultado
    }
        
    /**
     * Ejecuta un retraso atravez de una promesa.
     *
     * @param {number} ms El retrase en milisegundos.
     * @returns La promesa para ser ejecutada.
     * @memberof UtilidadesService
     */
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * Ordena un arreglo de objetos.
     *
     * @param {any []} arreglo Los datos que se quieren arreglar.
     * @param {string} campo El nombre del campo del objeto que se quiere arreglar. Si no se define este se
     * automaticamente se descartara el arreglo por objeto y se ordenara un arreglo simple.
     * @memberof UtilidadesService
     */
    ordenarArreglo(arreglo: any[], campo: string = '') {
        arreglo.sort((a, b) => {
        const ax: any[][] = [],
            bx: any[][] = []

        if (campo) {
            a[campo].replace(/(\d+)|(\D+)/g, function (_: any, $1: any, $2: any) {
            ax.push([$1 || Infinity, $2 || ''])
            })
            b[campo].replace(/(\d+)|(\D+)/g, function (_: any, $1: any, $2: any) {
            bx.push([$1 || Infinity, $2 || ''])
            })
        } else {
            a.replace(/(\d+)|(\D+)/g, function (_: any, $1: any, $2: any) {
            ax.push([$1 || Infinity, $2 || ''])
            })
            b.replace(/(\d+)|(\D+)/g, function (_: any, $1: any, $2: any) {
            bx.push([$1 || Infinity, $2 || ''])
            })
        }

        while (ax.length && bx.length) {
            const an = ax.shift() ?? []
            const bn = bx.shift() ?? []
            const nn = an[0] - bn[0] || an[1].localeCompare(bn[1])
            if (nn) {
            return nn
            }
        }

        return ax.length - bx.length
        })
    }

    validarParametros(
        campos: any[], 
        parametrosAValidar: { hasOwnProperty: (arg0: any) => any }
    ) {
        campos.forEach(campoAValidar => {
        if (!parametrosAValidar.hasOwnProperty(campoAValidar)) {
            return false
        }
        })
        return true
    }

    parsearFechaEnArreglo(fecha: Date): number[] {
        return [
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
        fecha.getHours(),
        fecha.getMinutes(),
        fecha.getSeconds(),
        fecha.getMilliseconds()
        ]
    }

    diferenciaFechas(fecha1: Date, fecha2: Date) {
        const fecha1utc = Date.UTC(
        fecha1.getFullYear(),
        fecha1.getMonth(),
        fecha1.getDate()
        )
        const fecha2utc = Date.UTC(
        fecha2.getFullYear(),
        fecha2.getMonth(),
        fecha2.getDate()
        )
        return (fecha1utc - fecha2utc) / DIA
    }

    parsearArregloEnterosEnFecha(arregloEnteros: any) {
        try {
        let deNuevo: [] = arregloEnteros
        return new Date(...deNuevo)
        } catch {
        return null
        }
    }

    /**
     * Elimina el elemento del indice especificado en un arreglo dado.
     * "No sparse" se refiere a que los elementos eliminados **NO** quedan
     * como "undefined" sin alterar el `length` del arreglo, si no que
     * si se elimina el elemento y cambia esta última propiedad, a diferencia
     * de `delete`.
     *
     * @param {any[]} [arreglo] El arreglo a modificar.
     * @param {number} [indice_eliminar] El indice del elemento para eliminar.
     * @returns {any[]} El arreglo sin el elemento de indice especificado.
     */
    removerElementoNoSparse(arreglo: any, indice_eliminar: number) {
        return arreglo.filter(function (actual: any, indice_actual: number, arr: any) {
            return indice_actual !== indice_eliminar
        })
    }

}


export interface CampoObtenido {
    valor: any
    ultimoCampo: string
    primerCampo: string
    campoSeleccionado: string
  }
  