interface PERMISO_DISPONIBLE {
    ruta: string;
    capacidades?: CAPACIDAD_DISPONIBLE[];
};

interface CAPACIDAD_DISPONIBLE {
    metodo: string;
    sub_capacidades?: string[];
}

export const PERMISOS_DISPONIBLES: PERMISO_DISPONIBLE[] = [
    {
        ruta: 'roles',
        capacidades: [
            {
                metodo: 'post',
                sub_capacidades: [
                    'permisos'
                ],
            },
            {
                metodo: 'get',
                sub_capacidades: [
                    'id',
                    'termino',
                    'permisos',
                ],
            },
            {
                metodo: 'put',
            },
            {
                metodo: 'delete',
                sub_capacidades: [
                    'id',
                    'permisos'
                ],
            },
        ]
    },
    {
        ruta: 'usuarios',
        capacidades: [
            {
                metodo: 'post',
            },
            {
                metodo: 'get',
                sub_capacidades: [
                    'id',
                    'termino',
                ],
            },
            {
                metodo: 'put',
                sub_capacidades: [
                    'rol',
                ],                
            },
            {
                metodo: 'delete',
                sub_capacidades: [
                    'id',
                    'rol',
                ],
            },
        ]
    }
]

export const PERMISOS_SOLO_SUPER_ADMIN: PERMISO_DISPONIBLE[] = [

]

