import { Api } from "./api"

export class Componente {
	ancho?: number
	codobjeto?: string
	defaultValue?: string
	disabled?: boolean
	idnwicomponente?: number
	idnwiparametrodependencias?: number[]
	label?: string
	nwiApi?: Api
	optional?: boolean
	parametrosHijos: number[]
	required?: boolean
	resultado?: any
	tag?: string
	tipodato?: string
	visible?: boolean
}