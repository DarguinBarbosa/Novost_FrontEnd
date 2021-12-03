
export interface TreeNode<T> {
  data: T;
}
export interface  MybreadCrumb {
  label: string;
  url ?:string 
}

export interface novedad {
    fechaInicio?: Date;
    duracionA?:any
    id:number
    acta:string
    fechaSolicitud?:string
    aprendizNovedad?:number
    tipoNovedad?:string
    estadoNovedad?:string
    comentario?:string
    DescripcionNovedad?:string
    t?:string
    ficha?:string
  }