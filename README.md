# Ejecución de la aplicación

Para correr la aplicación, seguir los siguientes pasos:

### `npm install`

Para la instalación de las dependencias

### `npm start`

Para correr la aplicación cliente, ésta correrá en http://localhost:4200/


## Librerias externas utilizadas

### angular-material

Se utilizó esta biblioteca de diseño de material design para la estructura de la aplicacion y uso de algunos componentes basicos (Botones, Inputs, Fuentes, Tabla)

### NGXS

Se utilizó esta biblioteca como manejador de estados para la aplicación. En este caso para el modulo Team


## Arquitectura

### Shared

Aquí importamos y exportamos los módulos de material que podrían llegar a ser utilizados por otros módulos. Tambien agregamos la directiva personalizada (tooltip)

### Team

Modulo y ruteo para para el manejo de los equipos. En éste modulo incorporamos los componentes necesarios como así también el manejo del state (NGXS) praa este modulo

#### Models

Interfaces necesarias para el manejo del modulo Team. En este caso una sola interface (Team)

#### Store

##### Actions

Las acciones que debemos manejar para el modulo Team, en este caso para las operaciones CRUD

##### State

Acciones para actualizar y guardar los datos del equipo en la tienda.

#### team-form

Componente para el manejo del formulario, tanto para agregar un nuevo equipo co opara editarlo

#### team-list

Componente para el manejo de la tabla para mostrar el listado de equipos, con la posibilidad de filtrar y ordenar las columnas


### Utils

Algunas funciones de utilidad para ser usadas en la aplicación


## Comentarios

###### Se utiliza la última versión de angular

###### Se implementó una pequeña directiva personalizada como fue solicitado (tooltip)

###### Se agregaron algunas validaciones en el formulario (Los campos de nombre y país son requeridos)

###### Al momento de editar un equipo se optó por pasar la información de este usando query params (Sin "ensuciar" la url)

###### El ID y la fecha de creación del equipo son generados programáticamente (El id representa el orden en que fue creado y la fecha de creación es la hora actual)

###### Al requerir un arreglo en la carga de datos, se optó por hacerlo mediante un input y en el momento de onblur o enter se agrega un "chip", con la posibilidad de eliminarlo y controlando de que no existan dos elementos iguales

###### Se utiliza la tabla de angular material para el listado de equipos, utilizando la páginacion, y el ordenamiento de columnas que ésta nos provee
